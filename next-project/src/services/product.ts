import { ApiResponse } from "@/types/api";
import { NewProduct, Product, ProductsResponse } from "@/types/product";
import api from "./axios";
import { ChangeEvent } from "react";

export const createProduct = async (body: FormData): Promise<ApiResponse<Product>> => {
  try {
    const { data } = await api.post<ApiResponse<Product>>(`/products`, body);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getAllProducts = async (): Promise<ApiResponse<ProductsResponse>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductsResponse>>(`/products`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getFilteredProducts = async (search: string): Promise<ApiResponse<ProductsResponse>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductsResponse>>(`/products?search=${search}`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getOneProduct = async (productId: number): Promise<ApiResponse<Product>> => {
  try {
    const { data } = await api.get<ApiResponse<Product>>(`/products/${productId}`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const updateProduct = async (productId: number, formData: FormData): Promise<ApiResponse<Product>> => {
  try {
    const { data } = await api.patch<ApiResponse<Product>>(`/products/${productId}`, formData);
    console.log(data.message)
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const deleteProduct = async (productId: number): Promise<ApiResponse> => {
  try {
    const { data } = await api.delete<ApiResponse>(`/products/${productId}`);
    return data;
  } catch (error: any) {
    return error.response?.data
  }
}