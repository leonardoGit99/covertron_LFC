import { ApiResponse } from "@/types/api";
import { CategoriesResponse, Category, NewCategory } from "@/types";
import { SubCategory } from "@/types/subcategory";
import api from "./axios";

// Endpoits
export const createCategory = async (body: NewCategory): Promise<ApiResponse<Category>> => {
  const { data } = await api.post<ApiResponse<Category>>(`/categories`, body);
  return data;
}

export const getAllCategories = async (): Promise<ApiResponse<CategoriesResponse>> => {
  try {
    const { data } = await api.get<ApiResponse<CategoriesResponse>>(`/categories`);
    return data;
  } catch (error: any) {
    if (error.response?.data) return error.response.data;

    return {
      success: false,
      message: 'Network error or server is unreachable',
      data: {
        total: 0,
        categories: [],
      },
    };
  }
}

export const getOneCategory = async (id: number): Promise<ApiResponse<Category>> => {
  try {
    const { data } = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return data;
  } catch (error: any) {
    return error.response?.data
  }
}

export const updateCategory = async (body: NewCategory, id: number): Promise<ApiResponse<SubCategory>> => {
  const { data } = await api.put<ApiResponse<SubCategory>>(`/categories/${id}`, JSON.stringify(body));
  return data;
}


export const deleteCategory = async (id: number): Promise<ApiResponse<Category>> => {
  const { data } = await api.delete(`/categories/${id}`);
  return data;
}