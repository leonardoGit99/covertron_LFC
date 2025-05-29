import { CategoryFormData } from "@/components/root/CategoryDialog";
import { baseLocalUrl as api, headers } from "./api.config";
import axios from "axios";
import { ApiResponse } from "@/types/api";
import { Categories } from "@/types";

// Types
type Category = {
  id: number;
  name: string;
  description: string;
};

type getCategorieCreated = {
  message: string;
  categorie: Category
};
type getAllCategoriesResponse = Category[]
type getOneCategorieResponse = Omit<Category, 'id'>

type getCategorieUpdated = getCategorieCreated


type getCategorieDeleted = {
  message: string
}
// type NewCategory = Omit<Category, 'id'>;

// Endpoits
export const createCategorie = async (body: CategoryFormData): Promise<getCategorieCreated> => {
  const response = await axios.post(`${api}/categories`, JSON.stringify(body), { headers });
  console.log(response)
  return response.data;
}

export const getAllCategories = async (): Promise<Categories> => {
  const response = await axios.get<Categories>(`${api}/categories`);
  return response.data;
}

export const getOneCategorie = async (id: number): Promise<getOneCategorieResponse> => {
  const response = await axios.get<getOneCategorieResponse>(`${api}/categories/${id}`);
  return response.data;
}

export const updateCategorie = async (body: CategoryFormData, id: number): Promise<getCategorieUpdated> => {
  const response = await axios.put<getCategorieUpdated>(`${api}/categories/${id}`, JSON.stringify(body), { headers });
  return response.data
}


export const deleteCategorie = async (id: number): Promise<getCategorieDeleted> => {
  const response = await axios.delete(`${api}/categories/${id}`);
  return response.data;
}