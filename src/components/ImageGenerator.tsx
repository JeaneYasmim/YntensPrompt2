import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { GoogleGenAI } from '@google/genai';
import { Image as ImageIcon, Loader2, Download, Trash2, Upload, FolderPlus, X } from 'lucide-react';

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

export function ImageGenerator({ initialPrompt }: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [modelType, setModelType] = useState<'nano' | 'flow'>('nano');
  const [aspectRatio, setAspectRatio] = useState('3:4');
  const [imageCount, setImageCount] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  
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
    });

    return () => {
      unsubCatalogs();
      unsubImages();
    };
  }, []);

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

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('O prompt não pode estar vazio.');
      return;
    }

    setIsGenerating(true);
    setError('');

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      const apiKey = process.env.GEMINI_API_KEY;
        
      const ai = new GoogleGenAI(apiKey ? { apiKey } : {});

      // Generate images sequentially to avoid rate limits (429 errors)
      for (let i = 0; i < imageCount; i++) {
        if (i > 0) {
          // Add a delay between requests to help mitigate 429s, especially on free tier
          await delay(2000);
        }

        const parts: any[] = [];
        
        baseImages.forEach(img => {
          const base64ImageData = img.preview.split(',')[1];
          parts.push({
            inlineData: {
              data: base64ImageData,
              mimeType: img.file.type
            }
          });
        });
        
        parts.push({ text: prompt });

        try {
          const requestOptions: any = {
            model: 'gemini-2.5-flash-image',
            contents: { parts }
          };

          const response = await ai.models.generateContent(requestOptions);

          let base64Data = '';
          for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
              base64Data = part.inlineData.data;
              break;
            }
          }

          if (!base64Data) {
            throw new Error('Nenhuma imagem retornada pela API.');
          }

          const imageUrl = `data:image/jpeg;base64,${base64Data}`;

          // Save to Firestore
          const imageData: any = {
            userId: auth.currentUser!.uid,
            prompt,
            imageUrl,
            model: 'nano',
            createdAt: serverTimestamp()
          };
          
          if (selectedCatalogId) {
            imageData.catalogId = selectedCatalogId;
          }

          await addDoc(collection(db, 'generated_images'), imageData);
        } catch (err: any) {
          const errorMessage = err.message || '';
          if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED') || errorMessage.includes('quota')) {
            throw new Error(`Limite de requisições excedido (Erro 429). ${i > 0 ? `${i} imagem(ns) gerada(s) com sucesso.` : ''} Por favor, aguarde um momento antes de gerar mais imagens.`);
          }
          throw err;
        }
      }

    } catch (err: any) {
      console.error('Error generating image:', err);
      setError(err.message || 'Erro ao gerar imagem. Tente novamente.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-emerald-400" />
            Gerador de Imagens (Nano Banana 2)
          </h2>
          <p className="text-zinc-400 mt-1">Gere imagens de alta qualidade usando o modelo Gemini 3.1 Flash Image Preview.</p>
        </div>

        {/* Controls */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          
          {/* Model Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-300">Modelo de Geração</label>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setModelType('nano')}
                className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-3 transition-all ${
                  modelType === 'nano'
                    ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                }`}
              >
                <span className="text-2xl">🍌</span>
                <div className="text-left">
                  <div className="font-medium text-sm">Nano Banana</div>
                  <div className="text-[10px] opacity-70">Gratuito • 1:1</div>
                </div>
              </button>
              <button
                onClick={() => setModelType('flow')}
                className={`flex-1 py-3 px-4 rounded-xl border flex items-center justify-center gap-3 transition-all ${
                  modelType === 'flow'
                    ? 'bg-emerald-900/30 border-emerald-500/50 text-emerald-100'
                    : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                }`}
              >
                <span className="text-2xl">✨</span>
                <div className="text-left">
                  <div className="font-medium text-sm">Google Flow</div>
                  <div className="text-[10px] opacity-70">Site Oficial (Iframe)</div>
                </div>
              </button>
            </div>
          </div>

          {modelType === 'flow' ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-emerald-900/20 border border-emerald-500/30 p-4 rounded-xl gap-4">
                <div className="text-sm text-emerald-200">
                  <p className="font-medium">Dica de Autenticação</p>
                  <p className="opacity-80">O Flow tenta usar a conta logada no seu navegador. Se a tela de login não carregar (por bloqueio de segurança do Google em iframes), abra o Flow em uma nova aba.</p>
                </div>
                <a 
                  href="https://labs.google/fx/pt/tools/flow" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  Abrir em Nova Aba
                </a>
              </div>
              <div className="w-full h-[800px] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
                <iframe 
                  src="https://labs.google/fx/pt/tools/flow" 
                  className="w-full h-full border-0" 
                  title="Google Flow"
                  allow="clipboard-write; storage-access"
                />
              </div>
            </div>
          ) : (
            <>
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
                className="w-full h-32 bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                placeholder="Descreva a imagem que você quer gerar... (Você também pode colar imagens aqui: Ctrl+V)"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Imagens Base (Opcional)</label>
              
              <div 
                className={`flex flex-wrap items-center gap-4 p-4 rounded-xl border-2 border-dashed transition-colors ${
                  isDragging ? 'border-emerald-500 bg-emerald-500/10' : 'border-zinc-800 bg-zinc-950/50 hover:border-zinc-700'
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
                
                <label className="flex flex-col items-center justify-center w-24 h-24 rounded-lg border border-dashed border-zinc-700 hover:border-emerald-500 hover:bg-zinc-800/50 cursor-pointer transition-colors shrink-0">
                  <Upload className="w-6 h-6 text-zinc-500 mb-1" />
                  <span className="text-[10px] text-zinc-500 text-center px-1">Upload</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleBaseImageUpload} />
                </label>
                
                {baseImages.length === 0 && (
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
              <div className="flex gap-2">
                {IMAGE_COUNTS.map((count) => (
                  <button
                    key={count}
                    onClick={() => setImageCount(count)}
                    className={`flex-1 py-3 rounded-xl border font-medium transition-all ${
                      imageCount === count
                        ? 'bg-zinc-800 border-zinc-600 text-zinc-100'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                    }`}
                  >
                    x{count}
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
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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
                  className="w-full sm:w-48 bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-zinc-100 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
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

          {/* Model Info & Generate Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-950 rounded-lg border border-zinc-800 text-sm text-zinc-300">
              <span>🍌</span>
              <span className="font-medium">
                Nano Banana (Gratuito)
              </span>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Gerando...
                </>
              ) : (
                'Gerar Imagem'
              )}
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
            </>
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
                className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option value="">Todas as Imagens</option>
                {catalogs.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            )}
          </div>
          
          {(() => {
            const filteredImages = selectedCatalogId 
              ? images.filter(img => img.catalogId === selectedCatalogId)
              : images;

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
                        <a 
                          href={img.imageUrl} 
                          download={`nano-banana-${img.id}.jpg`}
                          className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-full transition-colors"
                          title="Baixar Imagem"
                        >
                          <Download className="w-5 h-5" />
                        </a>
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
