import React from 'react';
import { Category } from '../types';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function Sidebar({ categories, selectedCategory, onSelectCategory }: SidebarProps) {
  return (
    <div className="w-64 bg-zinc-900 border-r border-zinc-800 h-full flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-xl font-bold tracking-tight text-zinc-100 flex items-center gap-2">
          <svg viewBox="0 0 100 120" className="w-6 h-7 text-zinc-100 shrink-0" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square" strokeLinejoin="miter">
            <path d="M 10 15 H 30 L 60 75" />
            <path d="M 40 105 L 75 10" />
            <path d="M 75 10 V 105 H 95" />
            <path d="M 60 60 H 75" />
          </svg>
          YntensPrompt 2.0
        </h1>
        <p className="text-xs text-zinc-400 mt-1">Prompt Generator</p>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {categories.map((cat: Category) => (
            <li key={cat.id}>
              <button
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-800 text-emerald-400'
                    : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
