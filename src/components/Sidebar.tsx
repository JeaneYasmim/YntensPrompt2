import React from 'react';
import { Category } from '../types';
import logo from '../assets/logo.svg';

interface SidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

export function Sidebar({ categories, selectedCategory, onSelectCategory }: SidebarProps) {
  return (
    <div className="sticky top-16 lg:top-0 w-full lg:w-64 bg-zinc-950/90 backdrop-blur-md lg:bg-zinc-950 border-b lg:border-r border-zinc-900 flex flex-col shrink-0 z-20">
      <div className="flex-1 overflow-x-auto lg:overflow-y-auto py-2 lg:py-4 no-scrollbar">
        <ul className="flex lg:flex-col gap-1 lg:gap-1 px-3">
          {categories.map((cat: Category) => (
            <li key={cat.id} className="shrink-0 lg:shrink">
              <button
                onClick={() => onSelectCategory(cat.id)}
                className={`whitespace-nowrap lg:whitespace-normal w-full text-left px-3 lg:px-4 py-1.5 lg:py-2.5 rounded-lg text-[11px] lg:text-sm font-bold transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-red-600 text-white border-red-600 shadow-md shadow-red-900/20'
                    : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200 border-transparent'
                }`}
              >
                <span className="mr-1.5">{cat.icon}</span>
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
