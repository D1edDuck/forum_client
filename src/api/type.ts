export interface IProduct {
  id: number;
  name: string;
  brand: string;
  model: string;
  price: number;
  stock: number;
  description?: string;
}

export interface ICatalog {
  id: number;
  name: string;
  slug: string;
}

export interface ICategory {
  id: number;
  name: string;
  products: IProduct[];
  count?: { products: number };
}

export interface IFilter {
  brand: string[];
  stock: string[];
  minValue: number;
  maxValue: number;
  search: string;
}
