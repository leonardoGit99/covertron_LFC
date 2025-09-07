import { ApiResponse } from "@/types/api";
import { ProductDetailAdminDTO, ProductDetailDTO, ProductsResponse, ProductsResponseAdmin } from "@/types/product";
import proxyApi from "./axiosProxyClient";
import api from "./axiosDirectClient";
import { method } from "lodash";
import { headers } from "next/headers";
import { baseLocalURLDirectClient, jsonHeaders } from "./api.config";

export const createProduct = async (body: FormData): Promise<ApiResponse<ProductDetailAdminDTO>> => {
  try {
    const { data } = await proxyApi.post<ApiResponse<ProductDetailAdminDTO>>(`/products`, body);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getAllProductsAdmin = async (currentPage: number, limit: number): Promise<ApiResponse<ProductsResponseAdmin>> => {
  try {
    const { data } = await proxyApi.get<ApiResponse<ProductsResponseAdmin>>(`/admin/products?page=${currentPage}&limit=${limit}`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getAllAvailableProducts = async (currentPage: number, limit: number): Promise<ApiResponse<ProductsResponse>> => {
  try {
    const res = await fetch(`${baseLocalURLDirectClient}/products?page=${currentPage}&limit=${limit}`,
      {
        method: "GET",
        headers: jsonHeaders,
        cache: "no-store"
      }
    )

    if (!res.ok) {
      return {
        success: false,
        message: `Error ${res.status}: ${res.statusText}`,
        data: {
          total: 0,
          products: []
        }
      };
    }

    const data: ApiResponse<ProductsResponse> = await res.json();
    return data;
  } catch (error: any) {
     console.error("Fetch error:", error);
    return {
      success: false,
      message: "Network error or server is unreachable",
      data: { total: 0, products: [] },
    };
  }
}


export const getFilteredProducts = async (search: string, limit: number, currentPage: number): Promise<ApiResponse<ProductsResponseAdmin>> => {
  try {
    const { data } = await proxyApi.get<ApiResponse<ProductsResponseAdmin>>(`/admin/products?search=${search}&page=${currentPage}&limit=${limit}`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getFilteredAvailableProducts = async (search: string, limit: number, currentPage: number): Promise<ApiResponse<ProductsResponse>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductsResponse>>(`/products?search=${search}&page=${currentPage}&limit=${limit}`);
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const getAllProductsByCategory = async (categoryId: number, limit: number, currentPage: number): Promise<ApiResponse<ProductsResponse>> => {
  try {
    const { data } = await api.get<ApiResponse<ProductsResponse>>(`/products?category=${categoryId}&page=${currentPage}&limit=${limit}`);

    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}


export const getOneProductAdmin = async (productId: number): Promise<ApiResponse<ProductDetailAdminDTO>> => {
  try {
    const { data } = await proxyApi.get<ApiResponse<ProductDetailAdminDTO>>(`/admin/products/${productId}`);
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
    const { data } = await proxyApi.patch<ApiResponse<ProductDetailAdminDTO>>(`/products/${productId}`, formData);
    console.log(data.message)
    return data;
  } catch (error: any) {
    return error.response?.data;
  }
}

export const deleteProduct = async (productId: number): Promise<ApiResponse> => {
  try {
    const { data } = await proxyApi.delete<ApiResponse>(`/products/${productId}`);
    return data;
  } catch (error: any) {
    return error.response?.data
  }
}