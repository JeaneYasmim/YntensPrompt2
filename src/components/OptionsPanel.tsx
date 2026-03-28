import React from 'react';
import { SelectedOptions, Category } from '../types';
import { Info } from 'lucide-react';

interface OptionsPanelProps {
  categories: Category[];
  selectedCategoryId: string;
  selectedOptions: SelectedOptions;
  onToggleOption: (categoryId: string, option: string) => void;
  clothingDescription: string;
  onClothingDescriptionChange: (desc: string) => void;
}

export function OptionsPanel({
  categories,
  selectedCategoryId,
  selectedOptions,
  onToggleOption,
  clothingDescription,
  onClothingDescriptionChange,
}: OptionsPanelProps) {
  const category = categories.find((c) => c.id === selectedCategoryId);

  if (!category) return null;

  return (
    <div className="flex-1 bg-zinc-950 p-4 md:p-8 lg:overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-zinc-100 tracking-tight mb-2">
          {category.label}
        </h2>
        <p className="text-zinc-400 text-sm mb-8">
          Selecione os parâmetros desejados para compor o prompt.
        </p>

        <div className="space-y-12">
          {category.subcategories.map((sub) => (
            <div key={sub.label}>
              <h3 className="text-lg font-medium text-zinc-300 mb-4 border-b border-zinc-800/50 pb-2">
                {sub.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sub.options.map((option) => {
                  const isSelected = selectedOptions[category.id]?.includes(option.label);
                  return (
                    <button
                      key={option.id}
                      onClick={() => onToggleOption(category.id, option.label)}
                      className={`relative group text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between min-h-[100px] ${
                        isSelected
                          ? 'bg-red-700/10 border-red-700/50 text-red-500 shadow-[0_0_15px_rgba(185,28,28,0.1)]'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800'
                      }`}
                    >
                      <div className="flex items-start justify-between w-full mb-2">
                        <span className="text-sm font-medium pr-4 leading-tight">{option.label}</span>
                        {isSelected && (
                          <span className="w-2 h-2 mt-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] flex-shrink-0"></span>
                        )}
                      </div>
                      
                      <div className="text-xs text-zinc-500 line-clamp-2 leading-relaxed group-hover:text-zinc-400 transition-colors">
                        {option.description}
                      </div>

                      {/* Tooltip for full description on hover */}
                      <div className="absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[120%] bg-zinc-800 text-zinc-200 text-xs p-3 rounded-lg shadow-xl border border-zinc-700 pointer-events-none">
                        {option.description}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800"></div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {category.id === 'estilo_roupa' && (
          <div className="mt-12 pt-8 border-t border-zinc-800">
            <label className="block text-sm font-medium text-zinc-300 mb-2">
              Descrição Detalhada da Roupa (Opcional)
            </label>
            <textarea
              value={clothingDescription}
              onChange={(e) => onClothingDescriptionChange(e.target.value)}
              placeholder="Descreva detalhes específicos. Ex: Jaqueta de couro preta com tachas, camiseta branca básica..."
              className="w-full h-32 bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-zinc-200 text-sm focus:outline-none focus:border-red-700/50 focus:ring-1 focus:ring-red-700/50 resize-none"
            />
          </div>
        )}
      </div>
    </div>
  );
}
