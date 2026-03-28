import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { OptionsPanel } from './components/OptionsPanel';
import { PromptArea } from './components/PromptArea';
import { ImageGenerator } from './components/ImageGenerator';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import LinksPanel from './components/LinksPanel';
import { SelectedOptions, Category } from './types';
import { CATEGORIES as DEFAULT_CATEGORIES, CONFLICTS } from './constants';
import { generatePrompt } from './services/geminiService';
import { AlertTriangle, ExternalLink, LogOut, Shield, Key, Clock } from 'lucide-react';
import logo from './assets/logo.svg';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'execution' | 'admin' | 'links'>('generator');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [clothingDescription, setClothingDescription] = useState<string>('');
  const [copyTypography, setCopyTypography] = useState<boolean>(false);
  const [typographyText, setTypographyText] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);
  const [isAutoGenerating, setIsAutoGenerating] = useState<boolean>(false);

  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().role === 'admin');
        }
      } else {
        setIsAdmin(false);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    // Use a one-time fetch for bootstrap if needed, then use onSnapshot for updates
    const checkAndBootstrap = async () => {
      const snap = await getDocs(collection(db, 'categories'));
      if (snap.empty && isAdmin) {
        console.log('Bootstrapping categories...');
        for (const cat of DEFAULT_CATEGORIES) {
          await setDoc(doc(db, 'categories', cat.id), { ...cat, order: DEFAULT_CATEGORIES.indexOf(cat) });
        }
      }
    };

    checkAndBootstrap();

    const unsub = onSnapshot(collection(db, 'categories'), (snap) => {
      if (snap.empty) {
        if (!isAdmin) {
          setCategories(DEFAULT_CATEGORIES);
          setSelectedCategory(prev => prev || DEFAULT_CATEGORIES[0].id);
        }
      } else {
        const catsData = snap.docs.map(d => d.data() as Category).sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(catsData);
        if (catsData.length > 0) {
          setSelectedCategory(prev => prev || catsData[0].id);
        }
      }
    });

    return () => unsub();
  }, [user, isAdmin]);

  const activeConflicts = useMemo(() => {
    const allSelected = Object.values(selectedOptions).flat();
    return CONFLICTS.filter(conflict => 
      conflict.options.every(opt => allSelected.includes(opt))
    );
  }, [selectedOptions]);

  const allSelectedItems = useMemo(() => {
    return Object.values(selectedOptions).flat();
  }, [selectedOptions]);

  const handleGenerate = async (fileToUse?: File) => {
    const finalFile = fileToUse !== undefined ? fileToUse : imageFile;
    setIsGenerating(true);
    try {
      let base64Image: string | undefined;
      let mimeType: string | undefined;

      if (finalFile) {
        base64Image = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(finalFile);
        });
        mimeType = finalFile.type;
      }

      const prompt = await generatePrompt(
        selectedOptions,
        clothingDescription,
        base64Image,
        mimeType,
        copyTypography,
        typographyText
      );
      
      setGeneratedPrompt(prompt);
    } catch (error: any) {
      console.error('Error generating prompt:', error);
      
      const errorMessage = error?.message || '';
      const isQuotaError = errorMessage.includes('429') || 
                           errorMessage.includes('quota') || 
                           errorMessage.includes('RESOURCE_EXHAUSTED') || 
                           errorMessage.includes('limite de uso gratuito');
      
      if (isQuotaError) {
        setCooldown(60);
        setGeneratedPrompt(
          '⚠️ Limite de Velocidade Atingido (Erro 429).\n\n' +
          'O Google limita a frequência de uso na versão gratuita para todos os usuários deste sistema simultaneamente. \n\n' +
          '💡 DICA: Você pode usar sua própria chave gratuita do Google para ter velocidade total e sem bloqueios. Clique no ícone de "Chave" no topo do app para configurar.'
        );
      } else {
        setGeneratedPrompt('Ocorreu um erro ao gerar o prompt. Verifique o console para mais detalhes.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Auto-generation logic with debounce
  useEffect(() => {
    // Don't auto-generate if we're already generating or if nothing is selected/uploaded
    const hasOptions = Object.values(selectedOptions as Record<string, string[]>).some(opts => opts.length > 0);
    if (!hasOptions && !clothingDescription && !imageFile) return;

    const timer = setTimeout(() => {
      handleGenerate();
    }, 10000); // 10s debounce to avoid hitting 429 too fast and reduce infrastructure load

    return () => clearTimeout(timer);
  }, [selectedOptions, clothingDescription, imageFile, copyTypography, typographyText]);

  const handleLogout = () => {
    signOut(auth);
  };

  if (authLoading) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-red-500">Carregando...</div>;
  }

  if (!user) {
    return <Auth />;
  }

  const handleToggleOption = (categoryId: string, option: string) => {
    setSelectedOptions((prev) => {
      const categoryOptions = prev[categoryId] || [];
      const isSelected = categoryOptions.includes(option);
      
      if (isSelected) {
        return {
          ...prev,
          [categoryId]: categoryOptions.filter((o) => o !== option),
        };
      } else {
        return {
          ...prev,
          [categoryId]: [...categoryOptions, option],
        };
      }
    });
  };

  const handleClearAll = () => {
    setSelectedOptions({});
    setClothingDescription('');
    setCopyTypography(false);
    setTypographyText('');
    setImageFile(null);
    setGeneratedPrompt('');
  };

  const handleOpenKeyDialog = async () => {
    try {
      await window.aistudio.openSelectKey();
    } catch (err) {
      console.error('Error opening key dialog:', err);
    }
  };

  const handleCopy = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-red-500/30">
      {/* Main Navigation Tabs - Fixed at top */}
      <div className="sticky top-0 h-16 lg:h-14 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 gap-2 z-30">
        <div className="flex items-center gap-2 lg:gap-4 flex-1">
          <div className="flex items-center gap-2 px-1 lg:px-2 shrink-0">
            <img src={logo} alt="Logo" className="w-6 h-6 lg:w-8 lg:h-8 rounded border border-zinc-800" />
            <span className="font-bold text-xs lg:text-sm hidden md:block">YntensPrompt <span className="text-red-700">2.0</span></span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-[10px] lg:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'generator' 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              1. Prompt
            </button>
            <button
              onClick={() => setActiveTab('execution')}
              className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-[10px] lg:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'execution' 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              2. Imagem
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-[10px] lg:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                activeTab === 'links' 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                  : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              3. Links
            </button>
            {isAdmin && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg text-[10px] lg:text-sm font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  activeTab === 'admin' 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                    : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                <Shield className="w-3 h-3 lg:w-4 lg:h-4" />
                Admin
              </button>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleLogout}
            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded-lg transition-colors"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeTab === 'admin' ? (
        <AdminPanel />
      ) : activeTab === 'links' ? (
        <LinksPanel />
      ) : activeTab === 'generator' ? (
        <>
          {/* Top Bar (Hidden on mobile to save space) */}
          <div className="hidden lg:flex h-14 bg-zinc-900 border-b border-zinc-800 items-center px-6 shrink-0 gap-4 overflow-x-auto no-scrollbar">
            <span className="text-sm font-medium text-zinc-400 whitespace-nowrap">Selecionados:</span>
            {allSelectedItems.length === 0 ? (
              <span className="text-sm text-zinc-600 italic">Nenhum item selecionado</span>
            ) : (
              <div className="flex gap-2 items-center">
                {allSelectedItems.map((item, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-zinc-800 text-zinc-300 text-xs rounded-full whitespace-nowrap border border-zinc-700">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Conflict Warnings */}
          {activeConflicts.length > 0 && (
            <div className="bg-amber-500/10 border-b border-amber-500/20 p-3 shrink-0 flex flex-col gap-2">
              {activeConflicts.map((conflict, idx) => (
                <div key={idx} className="flex items-center gap-2 text-amber-400 text-sm px-4">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span><strong>Conflito Detectado:</strong> {conflict.message}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col lg:flex-row flex-1">
            <Sidebar 
              categories={categories}
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
            <div className="flex flex-col md:flex-row flex-1">
              <OptionsPanel 
                categories={categories}
                selectedCategoryId={selectedCategory}
                selectedOptions={selectedOptions}
                onToggleOption={handleToggleOption}
                clothingDescription={clothingDescription}
                onClothingDescriptionChange={setClothingDescription}
              />
              <PromptArea 
                generatedPrompt={generatedPrompt}
                isGenerating={isGenerating}
                cooldown={cooldown}
                onGenerate={handleGenerate}
                onCopy={handleCopy}
                onPromptChange={setGeneratedPrompt}
                onClearAll={handleClearAll}
                copyTypography={copyTypography}
                setCopyTypography={setCopyTypography}
                typographyText={typographyText}
                setTypographyText={setTypographyText}
                imageFile={imageFile}
                setImageFile={setImageFile}
              />
            </div>
          </div>
        </>
      ) : (
        <ImageGenerator initialPrompt={generatedPrompt} />
      )}
    </div>
  );
}
