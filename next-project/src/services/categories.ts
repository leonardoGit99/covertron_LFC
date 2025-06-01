import { CategoryFormData } from "@/components/root/CategoryDialog";
import { baseLocalUrl as api, headers } from "./api.config";
import axios from "axios";
import { ApiResponse } from "@/types/api";
import { Categories, Category } from "@/types";
import { SubCategory } from "@/types/subcategory";

// Types


type getCategoryCreated = {
  message: string;
  category: Category
};
type getAllCategoriesResponse = Category[]
type getOneCategorieResponse = Omit<Category, 'id'>

type getCategorieUpdated = getCategoryCreated


type getCategorieDeleted = {
  message: string
}
// type NewCategory = Omit<Category, 'id'>;

// Endpoits
export const createCategory = async (body: CategoryFormData): Promise<ApiResponse<Category>> => {
  const { data } = await axios.post(`${api}/categories`, JSON.stringify(body), { headers });
  return data;
}

export const getAllCategories = async (): Promise<ApiResponse<Categories>> => {
  const { data } = await axios.get<ApiResponse<Categories>>(`${api}/categories`);
  return data;
}

export const getOneCategory = async (id: number): Promise<ApiResponse<Category>> => {
  const { data } = await axios.get<ApiResponse<Category>>(`${api}/categories/${id}`);
  return data;
}

export const updateCategory = async (body: CategoryFormData, id: number): Promise<ApiResponse<SubCategory>> => {
  const { data } = await axios.put<ApiResponse<SubCategory>>(`${api}/categories/${id}`, JSON.stringify(body), { headers });
  return data;
}


export const deleteCategory = async (id: number): Promise<ApiResponse<Category>> => {
  const { data } = await axios.delete(`${api}/categories/${id}`);
  return data;
}