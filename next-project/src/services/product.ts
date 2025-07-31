import { ApiResponse } from "@/types/api";
import { NewProduct, Product } from "@/types/product";
import api from "./axios";

export const createProduct = async (body: FormData): Promise<ApiResponse<Product>> => {
  try {
    const { data } = await api.post<ApiResponse<Product>>(`/products`, body);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
}