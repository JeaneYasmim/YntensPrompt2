import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { GoogleGenAI } from '@google/genai';
import { Image as ImageIcon, Loader2, Download, Trash2, Upload, FolderPlus, X, Check, ExternalLink, AlertTriangle, Key, Camera, CameraOff, Clock } from 'lucide-react';

interface ImageGeneratorProps {
  initialPrompt: string;
}

interface Catalog {
  id: string;
  name: string;
  userId: string;
  createdAt: any;
}

interface GeneratedImage {
  id: string;
  userId: string;
  prompt: string;
  imageUrl: string;
  aspectRatio?: string;
  model?: string;
  catalogId?: string;
  createdAt: any;
}

const ASPECT_RATIOS = [
  { id: '16:9', label: '16:9', icon: '▭' },
  { id: '4:3', label: '4:3', icon: '▢' },
  { id: '1:1', label: '1:1', icon: '◻' },
  { id: '3:4', label: '3:4', icon: '▯' },
  { id: '9:16', label: '9:16', icon: '▯' },
];

const IMAGE_COUNTS = [1, 2, 3, 4];

async function compressImage(base64Str: string, maxWidth = 768, quality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => resolve(base64Str);
  });
}

export function ImageGenerator({ initialPrompt }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [aspectRatio, setAspectRatio] = useState('3:4');
  const [imageCount, setImageCount] = useState(1);
  const [currentGeneratingIndex, setCurrentGeneratingIndex] = useState(0);
  const [saveToGallery, setSaveToGallery] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasUserKey, setHasUserKey] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasUserKey(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasUserKey(true);
    }
  };
  
  // Catalogs
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [selectedCatalogId, setSelectedCatalogId] = useState<string | null>(null);
  const [newCatalogName, setNewCatalogName] = useState('');
  const [isCreatingCatalog, setIsCreatingCatalog] = useState(false);

  // Base Images
  interface BaseImage {
    id: string;
    file: File;
    preview: string;
  }
  const [baseImages, setBaseImages] = useState<BaseImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [localImages, setLocalImages] = useState<GeneratedImage[]>([]);

  // Camera State
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      setIsCameraOpen(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraError('Não foi possível acessar a câmera. Verifique as permissões.');
    }
  };

  // Effect to attach stream to video element when it's rendered
  useEffect(() => {
    if (isCameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [isCameraOpen]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        
        // Convert dataUrl to File
        fetch(dataUrl)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], `camera-${Date.now()}.jpg`, { type: 'image/jpeg' });
            addBaseImages([file]);
            stopCamera();
          });
      }
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (initialPrompt) {
      setPrompt(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    if (!auth.currentUser) return;

    // Fetch Catalogs
    const qCatalogs = query(
      collection(db, 'catalogs'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubCatalogs = onSnapshot(qCatalogs, (snap) => {
      const cats: Catalog[] = [];
      snap.forEach((doc) => {
        cats.push({ id: doc.id, ...doc.data() } as Catalog);
      });
      setCatalogs(cats);
    }, (error) => {
      console.error("Error fetching catalogs:", error);
    });

    // Fetch Images
    const qImages = query(
      collection(db, 'generated_images'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubImages = onSnapshot(qImages, (snap) => {
      const imgs: GeneratedImage[] = [];
      snap.forEach((doc) => {
        imgs.push({ id: doc.id, ...doc.data() } as GeneratedImage);
      });
      setImages(imgs);
    }, (error) => {
      console.error("Error fetching images:", error);
    });

    return () => {
      unsubCatalogs();
      unsubImages();
    };
  }, [auth.currentUser?.uid]);

  const addBaseImages = (files: File[]) => {
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBaseImages(prev => [...prev, {
          id: Math.random().toString(36).substring(7),
          file,
          preview: reader.result as string
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleBaseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addBaseImages(Array.from(e.target.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      const files = Array.from(e.dataTransfer.files as FileList).filter((f: File) => f.type.startsWith('image/'));
      addBaseImages(files);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    const files: File[] = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) files.push(file);
      }
    }
    if (files.length > 0) {
      addBaseImages(files);
    }
  };

  const removeBaseImage = (id: string) => {
    setBaseImages(prev => prev.filter(img => img.id !== id));
  };

  const handleCreateCatalog = async () => {
    if (!newCatalogName.trim() || !auth.currentUser) return;
    setIsCreatingCatalog(true);
    try {
      const docRef = await addDoc(collection(db, 'catalogs'), {
        userId: auth.currentUser.uid,
        name: newCatalogName.trim(),
        createdAt: serverTimestamp()
      });
      setSelectedCatalogId(docRef.id);
      setNewCatalogName('');
    } catch (err) {
      console.error('Error creating catalog:', err);
    } finally {
      setIsCreatingCatalog(false);
    }
  };

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDeleteImage = async (img: GeneratedImage) => {
    try {
      if (img.id.startsWith('local-')) {
        setLocalImages(prev => prev.filter(i => i.id !== img.id));
      } else {
        await deleteDoc(doc(db, 'generated_images', img.id));
      }
      setDeletingId(null);
    } catch (err) {
      console.error('Erro ao excluir imagem:', err);
      setError('Não foi possível excluir a imagem.');
      setDeletingId(null);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('O prompt não pode estar vazio.');
      return;
    }

    setIsGenerating(true);
    setCurrentGeneratingIndex(0);
    setError('');
    console.log('Iniciando geração de', imageCount, 'imagens');

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      const userKey = process.env.API_KEY;
      const systemKey = process.env.GEMINI_API_KEY;
      const activeKey = userKey || systemKey;
      
      if (!activeKey) {
        throw new Error("O sistema está temporariamente indisponível (Chave não configurada).");
      }

      // Generate images sequentially to avoid rate limits (429 errors)
      for (let i = 0; i < imageCount; i++) {
        setCurrentGeneratingIndex(i + 1);
        if (i > 0) {
          // Increased delay to 10s + random jitter to help mitigate global 429s
          const jitter = Math.random() * 3000;
          await delay(10000 + jitter);
        }

        const parts: any[] = [];
        
        // Add images first to give them more weight in the model's attention
        baseImages.forEach(img => {
          const base64ImageData = img.preview.split(',')[1];
          parts.push({
            inlineData: {
              data: base64ImageData,
              mimeType: img.file.type
            }
          });
        });
        
        // If there are reference images, add a strong instruction to follow them
        let finalPrompt = prompt;
        if (baseImages.length > 0) {
          finalPrompt = `INSTRUÇÃO CRÍTICA: Use a(s) imagem(ns) de referência anexada(s) como o GUIA PRINCIPAL para o estilo, composição, cores e identidade visual. A nova imagem deve ser uma evolução ou variação fiel da referência, seguindo esta descrição: ${prompt}`;
        }
        
        parts.push({ text: finalPrompt });

        // If no user key is provided, strictly use the free-tier model (gemini-2.5-flash-image)
        // to avoid "Forbidden" errors from restricted models.
        let modelsToTry = [];
        if (hasUserKey) {
          modelsToTry = baseImages.length > 0 
            ? ['gemini-2.5-flash-image', 'gemini-3.1-flash-image-preview']
            : ['gemini-2.5-flash-image', 'gemini-3.1-flash-image-preview', 'imagen-4.0-generate-001'];
        } else {
          // Strictly free-tier only, but adding a fallback to 3.1 if 2.5 fails with proxy issues
          modelsToTry = ['gemini-2.5-flash-image', 'gemini-3.1-flash-image-preview'];
        }

        let success = false;
        let lastError: any = null;
        
        const ai = new GoogleGenAI({ apiKey: activeKey });

        for (const modelName of modelsToTry) {
          if (success) break;

          try {
            // Try up to 3 times for each model with exponential backoff
            for (let attempt = 0; attempt < 3; attempt++) {
              try {
                if (modelName.startsWith('imagen')) {
                  const response = await ai.models.generateImages({
                    model: modelName,
                    prompt: prompt,
                    config: {
                      numberOfImages: 1,
                      aspectRatio: aspectRatio as any,
                    },
                  });

                  const base64Data = response.generatedImages[0].image.imageBytes;
                  const rawImageUrl = `data:image/jpeg;base64,${base64Data}`;
                  
                  let imageUrl = rawImageUrl;
                  
                  if (saveToGallery) {
                    imageUrl = await compressImage(rawImageUrl);
                    const imageData: any = {
                      userId: auth.currentUser!.uid,
                      prompt,
                      imageUrl,
                      aspectRatio,
                      model: 'nano',
                      createdAt: serverTimestamp()
                    };
                    
                    if (selectedCatalogId) {
                      imageData.catalogId = selectedCatalogId;
                    }

                    const docRef = await addDoc(collection(db, 'generated_images'), imageData);
                    // No need to manually update state here as onSnapshot will handle it
                  } else {
                    // Just add to local state for temporary viewing/download
                    const localImg: GeneratedImage = {
                      id: `local-${Date.now()}`,
                      userId: auth.currentUser!.uid,
                      prompt,
                      imageUrl,
                      model: 'nano',
                      createdAt: { toDate: () => new Date() }
                    };
                    setLocalImages(prev => [localImg, ...prev]);
                  }
                  
                  success = true;
                  break;
                } else {
                  const response = await ai.models.generateContent({
                    model: modelName,
                    contents: { parts },
                    config: {
                      imageConfig: {
                        aspectRatio: aspectRatio as any
                      }
                    }
                  });

                  let base64Data = '';
                  for (const part of response.candidates?.[0]?.content?.parts || []) {
                    if (part.inlineData) {
                      base64Data = part.inlineData.data;
                      break;
                    }
                  }

                  if (!base64Data) throw new Error('Nenhuma imagem retornada.');

                  const rawImageUrl = `data:image/jpeg;base64,${base64Data}`;
                  
                  let imageUrl = rawImageUrl;

                  if (saveToGallery) {
                    imageUrl = await compressImage(rawImageUrl);
                    const imageData: any = {
                      userId: auth.currentUser!.uid,
                      prompt,
                      imageUrl,
                      aspectRatio,
                      model: 'nano',
                      createdAt: serverTimestamp()
                    };
                    
                    if (selectedCatalogId) {
                      imageData.catalogId = selectedCatalogId;
                    }

                    const docRef = await addDoc(collection(db, 'generated_images'), imageData);
                    // No need to manually update state here as onSnapshot will handle it
                  } else {
                    // Just add to local state for temporary viewing/download
                    const localImg: GeneratedImage = {
                      id: `local-${Date.now()}`,
                      userId: auth.currentUser!.uid,
                      prompt,
                      imageUrl,
                      model: 'nano',
                      createdAt: { toDate: () => new Date() }
                    };
                    setLocalImages(prev => [localImg, ...prev]);
                  }
                  
                  success = true;
                  break;
                }
              } catch (innerError: any) {
                lastError = innerError;
                const errorMsg = innerError?.message || '';
                const isQuotaError = errorMsg.includes('429') || 
                                     errorMsg.includes('quota') || 
                                     errorMsg.includes('RESOURCE_EXHAUSTED');
                
                const isForbidden = errorMsg.includes('Forbidden') || 
                                    errorMsg.includes('403') ||
                                    errorMsg.includes('not found');

                const isProxyError = errorMsg.includes('Proxying failed') || 
                                     errorMsg.includes('Failed to fetch');
                
                if (isForbidden && !hasUserKey) {
                  console.warn(`Access forbidden for ${modelName}, skipping...`);
                  break; // Skip to next model
                }

                if ((isQuotaError || isProxyError) && attempt < 3) {
                  // Increased backoff: 20s, 40s, 60s
                  const waitTime = Math.pow(2, attempt + 1) * 10000;
                  await delay(waitTime + (Math.random() * 10000));
                  continue;
                }
                throw innerError;
              }
            }
          } catch (err: any) {
            const errorMsg = err?.message || '';
            const isQuotaError = errorMsg.includes('429') || 
                                 errorMsg.includes('quota') || 
                                 errorMsg.includes('RESOURCE_EXHAUSTED');
            
            const isForbidden = errorMsg.includes('Forbidden') || 
                                errorMsg.includes('403') ||
                                errorMsg.includes('not found');

            if (isQuotaError || isForbidden) {
              console.warn(`Skipping model ${modelName} due to: ${errorMsg}`);
              continue;
            }
            throw err;
          }
        }

        if (!success) {
          const isProxyError = lastError?.message?.includes('Proxying failed') || lastError?.message?.includes('Failed to fetch');
          const isQuotaError = lastError?.message?.includes('429') || lastError?.message?.includes('quota');
          
          if (isQuotaError) {
            setCooldown(60); // Set a 60-second cooldown on the button
          }

          if (isProxyError) {
            throw new Error("⚠️ Erro de Conexão (Proxy). O servidor de imagens do Google está sobrecarregado ou a imagem de referência é muito grande. Tente novamente em alguns segundos ou use uma imagem menor.");
          }
          throw new Error("⚠️ Limite de Velocidade Atingido (Erro 429). O Google limita a frequência de gerações na versão gratuita para todos os usuários deste sistema simultaneamente. Por favor, aguarde o cronômetro no botão e tente novamente.");
        }
      }

    } catch (err: any) {
      console.error('Error generating image:', err);
      const errorMessage = err?.message || '';
      const isQuotaError = errorMessage.includes('429') || 
                           errorMessage.includes('quota') || 
                           errorMessage.includes('RESOURCE_EXHAUSTED');
      
      if (isQuotaError) {
        setError("⚠️ Limite de Velocidade Atingido (Erro 429). O Google limita a frequência de uso gratuito para todos os usuários deste sistema simultaneamente. \n\n💡 DICA: Use sua própria chave gratuita para evitar esse erro e ter velocidade total!");
      } else {
        setError(err.message || 'Erro ao gerar imagem. Tente novamente.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
              <ImageIcon className="w-6 h-6 text-red-500" />
              Gerador de Imagens (Plano Gratuito)
            </h2>
            <p className="text-zinc-400 mt-1">Gere imagens ilimitadas usando o modelo Nano Banana (Gemini 2.5 Flash Image).</p>
          </div>
          
          {!hasUserKey && (
            <button
              onClick={handleSelectKey}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 border border-zinc-700 rounded-xl text-xs font-bold transition-all"
            >
              <Key className="w-4 h-4" />
              Ativar Modo Pro (Chave Própria)
            </button>
          )}
          {hasUserKey && (
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 border border-green-500/20 rounded-xl text-xs font-bold">
              <Key className="w-4 h-4" />
              Chave Pessoal Ativa
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          
          {/* Prompt Input */}
          <div 
            className="space-y-4"
            onPaste={handlePaste}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-red-700 focus:ring-1 focus:ring-red-700 resize-none"
                placeholder="Descreva a imagem que você quer gerar... (Você também pode colar imagens aqui: Ctrl+V)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Imagens Base (Opcional)</label>
              
              <div 
                className={`flex flex-wrap items-center gap-4 p-4 rounded-xl border-2 border-dashed transition-colors ${
                  isDragging ? 'border-red-700 bg-red-700/10' : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {baseImages.map((img) => (
                  <div key={img.id} className="relative w-24 h-24 rounded-lg overflow-hidden border border-zinc-700 shrink-0 group">
                    <img src={img.preview} alt="Base" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeBaseImage(img.id)} 
                      className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                
                <label className="flex flex-col items-center justify-center w-24 h-24 rounded-lg border border-dashed border-zinc-700 hover:border-red-700 hover:bg-zinc-800/50 cursor-pointer transition-colors shrink-0">
                  <Upload className="w-6 h-6 text-zinc-500 mb-1" />
                  <span className="text-[10px] text-zinc-500 text-center px-1">Upload</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleBaseImageUpload} />
                </label>

                <button 
                  onClick={isCameraOpen ? stopCamera : startCamera}
                  className="flex flex-col items-center justify-center w-24 h-24 rounded-lg border border-dashed border-zinc-700 hover:border-red-700 hover:bg-zinc-800/50 cursor-pointer transition-colors shrink-0"
                >
                  {isCameraOpen ? <CameraOff className="w-6 h-6 text-red-500 mb-1" /> : <Camera className="w-6 h-6 text-zinc-500 mb-1" />}
                  <span className="text-[10px] text-zinc-500 text-center px-1">{isCameraOpen ? 'Fechar' : 'Câmera'}</span>
                </button>
                
                {isCameraOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
                    <div className="relative w-full max-w-lg bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl border border-zinc-800">
                      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                        <h3 className="font-bold text-zinc-100 flex items-center gap-2">
                          <Camera className="w-4 h-4 text-red-500" />
                          Capturar Referência
                        </h3>
                        <button onClick={stopCamera} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="relative aspect-video bg-black">
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline 
                          muted
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-6 flex flex-col gap-4">
                        {cameraError && (
                          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            {cameraError}
                          </div>
                        )}
                        
                        <div className="flex justify-center">
                          <button 
                            onClick={capturePhoto}
                            className="w-16 h-16 rounded-full border-4 border-white bg-red-600 hover:bg-red-500 shadow-xl transition-all active:scale-90 flex items-center justify-center"
                          >
                            <div className="w-12 h-12 rounded-full border-2 border-white/30" />
                          </button>
                        </div>
                        
                        <p className="text-[10px] text-zinc-500 text-center">
                          Aponte a câmera para o objeto ou pessoa e clique no botão acima para capturar.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {baseImages.length === 0 && !isCameraOpen && (
                  <p className="text-xs text-zinc-500 flex-1 min-w-[200px]">
                    Arraste imagens para cá, cole (Ctrl+V) ou clique em Upload. Você pode enviar várias imagens de referência.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Count */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Quantidade de Imagens</label>
              <div className="grid grid-cols-4 gap-2">
                {IMAGE_COUNTS.map((count) => (
                  <button
                    key={count}
                    onClick={() => setImageCount(count)}
                    className={`py-3 rounded-xl border font-bold transition-all ${
                      imageCount === count
                        ? 'bg-red-700 border-red-600 text-white shadow-lg shadow-red-900/20'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                    }`}
                  >
                    x{count}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Proporção</label>
              <div className="grid grid-cols-5 gap-2">
                {ASPECT_RATIOS.map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => setAspectRatio(ratio.id)}
                    className={`py-3 rounded-xl border font-bold transition-all flex flex-col items-center gap-1 ${
                      aspectRatio === ratio.id
                        ? 'bg-red-700 border-red-600 text-white shadow-lg shadow-red-900/20'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                    }`}
                  >
                    <span className="text-lg">{ratio.icon}</span>
                    <span className="text-[10px]">{ratio.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Catalogs */}
          <div className="space-y-2 pt-4 border-t border-zinc-800">
            <label className="text-sm font-medium text-zinc-300">Salvar no Catálogo</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <select 
                value={selectedCatalogId || ''} 
                onChange={(e) => setSelectedCatalogId(e.target.value || null)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:border-red-700 focus:ring-1 focus:ring-red-700"
              >
                <option value="">Nenhum catálogo (Geral)</option>
                {catalogs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Novo catálogo..." 
                  value={newCatalogName}
                  onChange={e => setNewCatalogName(e.target.value)}
                  className="w-full sm:w-48 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 text-sm focus:border-red-700 focus:ring-1 focus:ring-red-700"
                />
                <button 
                  onClick={handleCreateCatalog}
                  disabled={!newCatalogName.trim() || isCreatingCatalog}
                  className="px-4 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 rounded-xl text-zinc-100 transition-colors flex items-center justify-center"
                  title="Criar Catálogo"
                >
                  <FolderPlus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Model Info, Save Toggle & Generate Button */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pt-6 border-t border-zinc-800">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-950 rounded-xl border border-zinc-800 text-sm text-zinc-300 w-full sm:w-auto justify-center">
                <span>🍌</span>
                <span className="font-medium">Nano Banana (Gratuito)</span>
              </div>

              <div className="flex items-center gap-3 px-4 py-2 bg-zinc-950 rounded-xl border border-zinc-800 w-full sm:w-auto justify-center">
                <div 
                  className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${saveToGallery ? 'bg-red-600' : 'bg-zinc-700'}`} 
                  onClick={() => setSaveToGallery(!saveToGallery)}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${saveToGallery ? 'left-6' : 'left-1'}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-200">Salvar Galeria</span>
                  <span className="text-[9px] text-zinc-500">{saveToGallery ? 'Histórico (1MB)' : 'Download (Máx)'}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim() || cooldown > 0}
              className={`w-full lg:w-auto px-10 py-4 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 ${
                isGenerating || !prompt.trim() || cooldown > 0
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-red-700 hover:bg-red-600 text-white shadow-red-900/20'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gerando {imageCount > 1 ? `(${currentGeneratingIndex}/${imageCount})` : ''}...
                </>
              ) : cooldown > 0 ? (
                <>
                  <Clock className="w-5 h-5" />
                  Aguarde {cooldown}s...
                </>
              ) : (
                <>
                  <ImageIcon className="w-5 h-5" />
                  Gerar {imageCount > 1 ? `${imageCount} Imagens` : 'Imagem'}
                </>
              )}
            </button>
          </div>

          {error && (
            <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl space-y-4">
              <div className="flex items-start gap-3 text-red-400">
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">{error}</p>
              </div>
              
              {error.includes('429') && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleGenerate}
                    className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-100 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Loader2 className="w-3.5 h-3.5" />
                    Tentar Novamente
                  </button>
                  <button
                    onClick={handleSelectKey}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Key className="w-3.5 h-3.5" />
                    Usar Chave Própria (Sem Erros)
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Gallery */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-zinc-100">Suas Imagens</h3>
            {catalogs.length > 0 && (
              <select 
                value={selectedCatalogId || ''} 
                onChange={(e) => setSelectedCatalogId(e.target.value || null)}
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-300 focus:border-red-700 focus:ring-1 focus:ring-red-700"
              >
                <option value="">Todas as Imagens</option>
                {catalogs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            )}
          </div>
          
          {(() => {
            const allImages = [...localImages, ...images];
            const filteredImages = selectedCatalogId 
              ? allImages.filter(img => img.catalogId === selectedCatalogId)
              : allImages;

            if (filteredImages.length === 0) {
              return (
                <div className="text-center py-12 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl border-dashed">
                  <ImageIcon className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                  <p className="text-zinc-500">Nenhuma imagem encontrada neste catálogo.</p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((img) => (
                  <div key={img.id} className="group relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                    <div className="aspect-square bg-zinc-950 relative">
                      <img 
                        src={img.imageUrl} 
                        alt={img.prompt}
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        {deletingId === img.id ? (
                          <div className="flex flex-col items-center gap-2">
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Confirmar?</span>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDeleteImage(img)}
                                className="p-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors"
                                title="Confirmar Exclusão"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeletingId(null)}
                                className="p-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-lg transition-colors"
                                title="Cancelar"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <a 
                              href={img.imageUrl} 
                              download={`nano-banana-${img.id}.jpg`}
                              className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-full transition-colors"
                              title="Baixar Imagem"
                            >
                              <Download className="w-5 h-5" />
                            </a>
                            <button
                              onClick={() => setDeletingId(img.id)}
                              className="p-3 bg-red-900/40 hover:bg-red-900/60 text-red-200 rounded-full transition-colors"
                              title="Excluir Imagem"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-zinc-400 line-clamp-2 mb-2" title={img.prompt}>
                        {img.prompt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium px-2 py-1 bg-zinc-950 rounded-md text-zinc-500 border border-zinc-800">
                          {img.aspectRatio || '1:1'} {img.model === 'premium' ? '✨' : '🍌'}
                        </span>
                        <span className="text-xs text-zinc-600">
                          {img.createdAt?.toDate ? img.createdAt.toDate().toLocaleDateString() : 'Agora'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>

      </div>
    </div>
  );
}
