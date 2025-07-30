import { ApiResponse } from "@/types/api";
import { NewSubCategory,  SubCategoriesResponse, SubCategory, SubCategoryWithoutID } from "@/types/subcategory";
import api from "./axios";


// Endpoits
export const createSubCategory = async (body: NewSubCategory, categoryId: number): Promise<ApiResponse<SubCategory>> => {
  const { data } = await api.post<ApiResponse<SubCategory>>(`/categories/${categoryId}/sub-categories`, JSON.stringify(body));
  return data;
}

export const getAllSubCategories = async (): Promise<ApiResponse<SubCategoriesResponse>> => {
  try {
    const { data } = await api.get<ApiResponse<SubCategoriesResponse>>(`/sub-categories`);
    return data;
  } catch (error: any) {
    if (error.response?.data) return error.response.data;

    return {
      success: false,
      message: 'Network error or server is unreachable',
      data: {
        total: 0,
        subCategories: [],
      },
    };
  }
};

export const getOneSubCategory = async (subCategoryId: number): Promise<ApiResponse<SubCategory>> => {
  const { data } = await api.get<ApiResponse<SubCategory>>(`/sub-categories/${subCategoryId}`);
  return data;
}

export const getSubCategoriesByCategory = async (id: number): Promise<ApiResponse<SubCategoriesResponse>> => {
  const { data } = await api.get<ApiResponse<SubCategoriesResponse>>(`/sub-categories?categoryId=${id}`)
  return data;
}

export const updateSubCategory = async (body: NewSubCategory, subCategoryId: number, categoryId: number): Promise<ApiResponse<SubCategory>> => {
  const { data } = await api.put<ApiResponse<SubCategory>>(`/categories/${categoryId}/sub-categories/${subCategoryId}`, JSON.stringify(body));
  return data;
}


export const deleteSubCategory = async (id: number): Promise<ApiResponse<SubCategoryWithoutID>> => {
  const { data } = await api.delete<ApiResponse<SubCategoryWithoutID>>(`/sub-categories/${id}`);
  return data;
}