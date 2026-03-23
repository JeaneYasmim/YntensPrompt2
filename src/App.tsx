import React, { useState, useMemo, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { OptionsPanel } from './components/OptionsPanel';
import { PromptArea } from './components/PromptArea';
import { ImageGenerator } from './components/ImageGenerator';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import { SelectedOptions, Category } from './types';
import { CATEGORIES as DEFAULT_CATEGORIES, CONFLICTS } from './constants';
import { generatePrompt } from './services/geminiService';
import { AlertTriangle, ExternalLink, LogOut, Shield } from 'lucide-react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot, doc, getDoc, setDoc } from 'firebase/firestore';

export default function App() {
  const [activeTab, setActiveTab] = useState<'generator' | 'execution' | 'admin'>('generator');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [clothingDescription, setClothingDescription] = useState<string>('');
  const [copyTypography, setCopyTypography] = useState<boolean>(false);
  const [typographyText, setTypographyText] = useState<string>('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

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
    
    const unsub = onSnapshot(collection(db, 'categories'), async (snap) => {
      if (snap.empty) {
        // Bootstrap default categories if empty (only admin should ideally do this, but we do it once)
        if (isAdmin) {
          for (const cat of DEFAULT_CATEGORIES) {
            await setDoc(doc(db, 'categories', cat.id), { ...cat, order: DEFAULT_CATEGORIES.indexOf(cat) });
          }
        } else {
          setCategories(DEFAULT_CATEGORIES);
          setSelectedCategory(DEFAULT_CATEGORIES[0].id);
        }
      } else {
        const catsData = snap.docs.map(d => d.data() as Category).sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(catsData);
        if (catsData.length > 0 && !selectedCategory) {
          setSelectedCategory(catsData[0].id);
        }
      }
    });

    return () => unsub();
  }, [user, isAdmin, selectedCategory]);

  const activeConflicts = useMemo(() => {
    const allSelected = Object.values(selectedOptions).flat();
    return CONFLICTS.filter(conflict => 
      conflict.options.every(opt => allSelected.includes(opt))
    );
  }, [selectedOptions]);

  const allSelectedItems = useMemo(() => {
    return Object.values(selectedOptions).flat();
  }, [selectedOptions]);

  const handleLogout = () => {
    signOut(auth);
  };

  if (authLoading) {
    return <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-emerald-400">Carregando...</div>;
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
    setGeneratedPrompt('');
  };

  const handleGenerate = async (imageFile?: File) => {
    setIsGenerating(true);
    try {
      let base64Image: string | undefined;
      let mimeType: string | undefined;

      if (imageFile) {
        base64Image = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
        mimeType = imageFile.type;
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
      if (errorMessage.includes('429') || errorMessage.includes('quota') || errorMessage.includes('RESOURCE_EXHAUSTED') || errorMessage.includes('limite de uso gratuito')) {
        setGeneratedPrompt('⚠️ Limite de uso excedido (Erro 429).\n\nA API do Gemini atingiu o limite de requisições ou a cota do plano atual acabou. Por favor, aguarde um momento e tente novamente mais tarde.');
      } else {
        setGeneratedPrompt('Ocorreu um erro ao gerar o prompt. Verifique o console para mais detalhes.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedPrompt) {
      navigator.clipboard.writeText(generatedPrompt);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Main Navigation Tabs */}
      <div className="h-14 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 gap-2 z-10">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'generator' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
            }`}
          >
            Passo 1: Gerador de Prompt
          </button>
          <button
            onClick={() => setActiveTab('execution')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'execution' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
            }`}
          >
            Passo 2: Gerar Imagem
          </button>
          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'admin' 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <Shield className="w-4 h-4" />
              Painel Admin
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-zinc-400 hidden sm:inline-block">{user.email}</span>
          <button
            onClick={handleLogout}
            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 rounded-lg transition-colors"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeTab === 'admin' ? (
        <AdminPanel />
      ) : activeTab === 'generator' ? (
        <>
          {/* Top Bar */}
          <div className="h-14 bg-zinc-900 border-b border-zinc-800 flex items-center px-6 shrink-0 gap-4 overflow-x-auto no-scrollbar">
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

          <div className="flex flex-1 overflow-hidden">
            <Sidebar 
              categories={categories}
              selectedCategory={selectedCategory} 
              onSelectCategory={setSelectedCategory} 
            />
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
              onGenerate={handleGenerate}
              onCopy={handleCopy}
              onPromptChange={setGeneratedPrompt}
              onClearAll={handleClearAll}
              copyTypography={copyTypography}
              setCopyTypography={setCopyTypography}
              typographyText={typographyText}
              setTypographyText={setTypographyText}
            />
          </div>
        </>
      ) : (
        <ImageGenerator initialPrompt={generatedPrompt} />
      )}
    </div>
  );
}
