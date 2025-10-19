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
  _count?: { products: number };
}

export interface IFilter {
  brand: string[];
  stock: string[];
  minValue: number;
  maxValue: number;
  search?: string;
  loading: boolean;
  error: string | null;
}

export interface IBooking {
  name: string;
  phone: string;
  email?: string;
  cause: string;
  comment: string;
}

export interface IUser {
  id: number | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  role: "user" | "admin" | null;
}

export interface IUserWithToken {
  user: IUser;
  token: string;
}

export interface IRepair {
  id: number;
  userId: number;
  cause: string;
  comment: string;
  status: "pending" | "rejected";
}
