import axios from "axios";
import type { Product } from "../types/product";
// import type { Product } from "../redux/productSlice";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchFilteredProductsApi = async (params: {
  category: string[];
  subCategory: string[];
  sort: string;
  search: string;
}): Promise<Product[]> => {
  const query = new URLSearchParams();

  if (params.category.length > 0) query.append("category", params.category.join(","));
  if (params.subCategory.length > 0) query.append("subCategory", params.subCategory.join(","));
  if (params.sort) query.append("sort", params.sort);
  if (params.search) query.append("search", params.search);

  const response = await axios.get(`${API_URL}/filter?${query.toString()}`);
  return response.data;
};

