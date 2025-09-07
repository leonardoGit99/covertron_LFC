import { ApiResponse } from "@/types/api";
import { CategoriesResponse, Category, CreateCategoryDTO, UpdateCategoryDTO } from "@/types"; 
import proxyApi from "./axiosProxyClient";
import { baseLocalURLDirectClient } from "./api.config";
import {jsonHeaders} from "./api.config"

// Endpoits
export const createCategory = async (body: CreateCategoryDTO): Promise<ApiResponse<Category>> => {
  try {
    const { data } = await proxyApi.post<ApiResponse<Category>>(`/categories`, body);
    return data;
  } catch (error: any) {
    return error.response?.data
  }
}

export const getAllCategories = async (): Promise<ApiResponse<CategoriesResponse>> => {
  try {
    const res = await fetch(`${baseLocalURLDirectClient}/categories`,{
      method: "GET",
      headers: jsonHeaders,
      cache: "no-store"
    })

    if(!res.ok){
      return {
        success: false,
        message: `Error ${res.status}: ${res.statusText}`,
        data: {
          total: 0,
          categories:[]
        }
      };
    }

    const data: ApiResponse<CategoriesResponse> = await res.json();
    return data;
  } catch (error: any) {
    console.error("Fetch error:", error);
    return {
      success: false,
      message: "Network error or server is unreachable",
      data: { total: 0, categories: [] },
    };
  }
}

export const getOneCategory = async (id: number): Promise<ApiResponse<Category>> => {
  try {
    const { data } = await proxyApi.get<ApiResponse<Category>>(`/categories/${id}`);
    return data;
  } catch (error: any) {
    return error.response?.data
  }
}

export const updateCategory = async (body: UpdateCategoryDTO, id: number): Promise<ApiResponse<Category>> => {
  try {
    const { data } = await proxyApi.patch<ApiResponse<Category>>(`/categories/${id}`, body);
    return data;
  } catch (error: any) {
    return error.response?.data
  }
}


export const deleteCategory = async (id: number): Promise<ApiResponse<Category>> => {
  try {
    const { data } = await proxyApi.delete(`/categories/${id}`);
    return data;
  } catch (error: any) {
    return error.response?.data
  }

}