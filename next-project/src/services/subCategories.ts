import { CategoryFormData } from "@/components/root/CategoryDialog";
import { baseLocalUrl as api, headers } from "./api.config";
import axios from "axios";
import { ApiResponse } from "@/types/api";
import { SubCategoryFormData } from "@/components/root/SubCategoryDialog";
import { SubCategories, SubCategory, SubCategoryWithCategoryName, SubCategoryWithoutID } from "@/types/subcategory";


// Endpoits
export const createSubCategory = async (body: SubCategoryWithoutID): Promise<ApiResponse<SubCategory>> => {
  const response = await axios.post<ApiResponse<SubCategory>>(`${api}/sub-categories`, JSON.stringify(body), { headers });
  console.log(response)
  return response.data;
}

export const getAllSubCategories = async (): Promise<ApiResponse<SubCategories>> => {
  const { data } = await axios.get<ApiResponse<SubCategories>>(`${api}/sub-categories`);
  return data;
}

export const getOneSubCategory = async (id: number): Promise<ApiResponse<SubCategoryWithCategoryName>> => {
  const { data } = await axios.get<ApiResponse<SubCategoryWithCategoryName>>(`${api}/sub-categories/${id}`);
  return data;
}

export const updateSubCategory = async (body: SubCategoryWithoutID, id: number): Promise<ApiResponse<SubCategory>> => {
  const response = await axios.put<ApiResponse<SubCategory>>(`${api}/sub-categories/${id}`, JSON.stringify(body), { headers });
  return response.data
}


export const deleteSubCategory = async (id: number): Promise<ApiResponse<SubCategoryWithoutID>> => {
  const { data } = await axios.delete<ApiResponse<SubCategoryWithoutID>>(`${api}/sub-categories/${id}`);
  return data;
}