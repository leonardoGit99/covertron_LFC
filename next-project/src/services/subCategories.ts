import { ApiResponse } from "@/types/api";
import { SubCategories, SubCategoriesResponse, SubCategory, SubCategoryWithCategoryName, SubCategoryWithoutID } from "@/types/subcategory";
import api from "./axios";


// Endpoits
export const createSubCategory = async (body: SubCategoryWithoutID, categoryId: number): Promise<ApiResponse<SubCategory>> => {
  const { data } = await api.post<ApiResponse<SubCategory>>(`/categories/${categoryId}/sub-categories`, JSON.stringify(body));
  return data;
}

export const getAllSubCategories = async (): Promise<ApiResponse<SubCategoriesResponse>> => {
  const { data } = await api.get<ApiResponse<SubCategoriesResponse>>(`/sub-categories`);
  return data;
}

export const getOneSubCategory = async (id: number): Promise<ApiResponse<SubCategory>> => {
  const { data } = await api.get<ApiResponse<SubCategory>>(`/sub-categories/${id}`);
  return data;
}

export const getSubCategoriesByCategory = async (id: number): Promise<ApiResponse<SubCategoriesResponse>> => {
  const { data } = await api.get<ApiResponse<SubCategoriesResponse>>(`/sub-categories?categoryId=${id}`)
  return data;
}

export const updateSubCategory = async (body: SubCategoryWithoutID, subCategoryId: number): Promise<ApiResponse<SubCategory>> => {
  const { data } = await api.put<ApiResponse<SubCategory>>(`/categories/${categoryId}/sub-categories/${subCategoryId}`, JSON.stringify(body));
  return data;
}


export const deleteSubCategory = async (id: number): Promise<ApiResponse<SubCategoryWithoutID>> => {
  const { data } = await api.delete<ApiResponse<SubCategoryWithoutID>>(`/sub-categories/${id}`);
  return data;
}