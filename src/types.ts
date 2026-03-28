export interface Option {
  id: string;
  label: string;
  description: string;
}

export interface SubCategory {
  label: string;
  options: Option[];
}

export interface Category {
  id: string;
  label: string;
  subcategories: SubCategory[];
  order?: number;
  icon?: string;
}

export interface Conflict {
  options: string[];
  message: string;
}

export type SelectedOptions = Record<string, string[]>;
