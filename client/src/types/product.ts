
export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
};

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}
