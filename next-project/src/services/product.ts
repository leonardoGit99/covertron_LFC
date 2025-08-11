import { ApiResponse } from "@/types/api";
import {  ProductDetailAdminDTO, ProductDetailDTO, ProductsResponse, ProductsResponseAdmin } from "@/types/product";
import api from "./axios";

export const createProduct = async (body: FormData): Promise<ApiResponse<ProductDetailAdminDTO>> => {
  try {
    const { data } = await api.post<ApiResponse<ProductDetailAdminDTO>>(`/products`, body);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getAllProductsAdmin = async (currentPage: number, limit: number): Promise<ApiResponse<ProductsResponseAdmin>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductsResponseAdmin>>(`/admin/products?page=${currentPage}&limit=${limit}`);
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


export const getFilteredProducts = async (search: string, limit: number, currentPage: number): Promise<ApiResponse<ProductsResponseAdmin>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductsResponseAdmin>>(`/admin/products?search=${search}&page=${currentPage}&limit${limit}`);
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


export const getOneProductAdmin = async (productId: number): Promise<ApiResponse<ProductDetailAdminDTO>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductDetailAdminDTO>>(`/admin/products/${productId}`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getOneProduct = async (productId: number): Promise<ApiResponse<ProductDetailDTO>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductDetailDTO>>(`/products/${productId}`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const updateProduct = async (productId: number, formData: FormData): Promise<ApiResponse<ProductDetailAdminDTO>> => {
  try {
    const { data } = await api.patch<ApiResponse<ProductDetailAdminDTO>>(`/products/${productId}`, formData);
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