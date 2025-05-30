import { CategoryFormData } from "@/components/root/CategoryDialog";
import { baseLocalUrl as api, headers } from "./api.config";
import axios from "axios";
import { ApiResponse } from "@/types/api";
import { Categories, Category } from "@/types";

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
export const createCategory = async (body: CategoryFormData): Promise<getCategoryCreated> => {
  const response = await axios.post(`${api}/categories`, JSON.stringify(body), { headers });
  console.log(response)
  return response.data;
}

export const getAllCategories = async (): Promise<ApiResponse<Categories>> => {
  const response = await axios.get<ApiResponse<Categories>>(`${api}/categories`);
  return response.data;
}

export const getOneCategory = async (id: number): Promise<getOneCategorieResponse> => {
  const response = await axios.get<getOneCategorieResponse>(`${api}/categories/${id}`);
  return response.data;
}

export const updateCategory = async (body: CategoryFormData, id: number): Promise<getCategorieUpdated> => {
  const response = await axios.put<getCategorieUpdated>(`${api}/categories/${id}`, JSON.stringify(body), { headers });
  return response.data
}


export const deleteCategory = async (id: number): Promise<getCategorieDeleted> => {
  const response = await axios.delete(`${api}/categories/${id}`);
  return response.data;
}