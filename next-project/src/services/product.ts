import { ApiResponse } from "@/types/api";
import {  Product, ProductsResponse } from "@/types/product";
import api from "./axios";

export const createProduct = async (body: FormData): Promise<ApiResponse<Product>> => {
  try {
    const { data } = await api.post<ApiResponse<Product>>(`/products`, body);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getAllProducts = async (currentPage: number, limit: number): Promise<ApiResponse<ProductsResponse>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductsResponse>>(`/admin/products?page=${currentPage}&limit=${limit}`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getAllAvailableProducts = async (currentPage: number, limit: number): Promise<ApiResponse<ProductsResponse>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductsResponse>>(`/products?page=${currentPage}&limit=${limit}`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}


export const getFilteredProducts = async (search: string, limit: number, currentPage: number): Promise<ApiResponse<ProductsResponse>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductsResponse>>(`/admin/products?search=${search}&page=${currentPage}&limit${limit}`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getFilteredAvailableProducts = async (search: string, limit: number, currentPage: number): Promise<ApiResponse<ProductsResponse>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductsResponse>>(`/products?search=${search}&page=${currentPage}&limit${limit}`);
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