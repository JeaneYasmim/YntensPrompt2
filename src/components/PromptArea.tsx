import React, { useRef, useState } from 'react';
import { Upload, Copy, RefreshCw, Wand2, Image as ImageIcon, Trash2, Check, Type } from 'lucide-react';

interface PromptAreaProps {
  generatedPrompt: string;
  isGenerating: boolean;
  onGenerate: (imageFile?: File) => void;
  onCopy: () => void;
  onPromptChange: (newPrompt: string) => void;
  onClearAll: () => void;
  copyTypography: boolean;
  setCopyTypography: (val: boolean) => void;
  typographyText: string;
  setTypographyText: (val: string) => void;
}

export function PromptArea({
  generatedPrompt,
  isGenerating,
  onGenerate,
  onCopy,
  onPromptChange,
  onClearAll,
  copyTypography,
  setCopyTypography,
  typographyText,
  setTypographyText,
}: PromptAreaProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setCopyTypography(false);
    setTypographyText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCopyClick = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearClick = () => {
    clearImage();
    onClearAll();
  };

  return (
    <div className="w-96 bg-zinc-900 border-l border-zinc-800 h-full flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <h2 className="text-lg font-semibold text-zinc-100 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-emerald-400" />
          Gerador
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Image Upload Section */}
        <div className="bg-zinc-950 rounded-xl border border-zinc-800 p-4">
          <h3 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Imagem de Referência
          </h3>
          
          {!imagePreview ? (
            <div 
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                isDragging 
                  ? 'border-emerald-500 bg-emerald-500/10' 
                  : 'border-zinc-800 hover:border-emerald-500/50 hover:bg-zinc-900'
              }`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className={`w-6 h-6 mx-auto mb-2 ${isDragging ? 'text-emerald-400' : 'text-zinc-500'}`} />
              <p className="text-xs text-zinc-400">Clique ou arraste uma imagem aqui</p>
              <p className="text-[10px] text-zinc-500 mt-1">PNG, JPG, WEBP</p>
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 group">
              <img src={imagePreview} alt="Reference" className="w-full h-32 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button 
                  onClick={clearImage}
                  className="text-xs bg-red-500/80 text-white px-3 py-1.5 rounded-md hover:bg-red-500"
                >
                  Remover
                </button>
              </div>
            </div>
          )}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />

          {imagePreview && (
            <div className="mt-4 pt-4 border-t border-zinc-800">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                  <Type className="w-4 h-4 text-emerald-400" />
                  Copiar Tipografia da Referência?
                </label>
                <div className="flex bg-zinc-900 rounded-lg p-1 border border-zinc-800">
                  <button
                    onClick={() => setCopyTypography(true)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      copyTypography 
                        ? 'bg-emerald-500 text-zinc-950 shadow-sm' 
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Sim
                  </button>
                  <button
                    onClick={() => setCopyTypography(false)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      !copyTypography 
                        ? 'bg-zinc-700 text-zinc-100 shadow-sm' 
                        : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Não
                  </button>
                </div>
              </div>

              {copyTypography && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-200">
                  <label className="block text-xs text-zinc-400 mb-1.5 font-medium">
                    O que deve estar escrito?
                  </label>
                  <input
                    type="text"
                    value={typographyText}
                    onChange={(e) => setTypographyText(e.target.value)}
                    placeholder="Ex: YntensPrompt 2.0"
                    className="w-full bg-zinc-900 border-2 border-emerald-500/50 rounded-lg px-3 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1.5">
                    O estilo da fonte, cores e efeitos 3D da imagem original serão aplicados a este texto.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Generate Button */}
        <button
          onClick={() => onGenerate(imageFile || undefined)}
          disabled={isGenerating}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold py-3 px-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Gerando Prompt...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Gerar Prompt
            </>
          )}
        </button>

        {/* Output Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-zinc-300">Prompt Final</h3>
            <div className="flex gap-2">
              <button
                onClick={handleClearClick}
                className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors border border-zinc-700 hover:border-red-500/30"
                title="Limpar tudo (seleções, imagem e prompt)"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Limpar
              </button>
              {generatedPrompt && (
                <button
                  onClick={handleCopyClick}
                  className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all border ${
                    copied 
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                      : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20 hover:border-emerald-500/40'
                  }`}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copiado!' : 'Copiar'}
                </button>
              )}
            </div>
          </div>
          <textarea
            value={generatedPrompt}
            onChange={(e) => onPromptChange(e.target.value)}
            placeholder="O prompt gerado aparecerá aqui..."
            className="flex-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 text-zinc-300 text-xs font-mono focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
