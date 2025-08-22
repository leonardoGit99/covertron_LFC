import { ApiResponse } from "@/types/api";
import { CategoriesResponse, Category, CreateCategoryDTO, UpdateCategoryDTO } from "@/types";
import { SubCategory } from "@/types/subcategory";
import api from "./axios";

// Endpoits
export const createCategory = async (body: CreateCategoryDTO): Promise<ApiResponse<Category>> => {
  try {
    const { data } = await api.post<ApiResponse<Category>>(`/categories`, body);
    return data;
  } catch (error: any) {
    return error.response?.data
  }
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

export const updateCategory = async (body: UpdateCategoryDTO, id: number): Promise<ApiResponse<Category>> => {
  try {
    const { data } = await api.patch<ApiResponse<Category>>(`/categories/${id}`, body);
    return data;
  } catch (error: any) {
    return error.response?.data
  }
}


export const deleteCategory = async (id: number): Promise<ApiResponse<Category>> => {
  try {
    const { data } = await api.delete(`/categories/${id}`);
    return data;
  } catch (error: any) {
    return error.response?.data
  }

}