import { CategoryFormData } from "@/components/CategorieDialog";
import { baseLocalUrl as api, headers } from "./api.config";
import axios from "axios";

// Types
type Category = {
  id: number;
  name: string;
  description: string;
};

type getAllCategoriesResponse = Category[]

type NewCategory = Omit<Category, 'id'>;

type getCategorieCreated = {
  message: string;
  categorie: Category
};

type getCategorieDeleted = {
  message: string
}

// Endpoits
export const getAllCategories = async (): Promise<getAllCategoriesResponse> => {
  const response = await axios.get<getAllCategoriesResponse>(`${api}/categories`);
  console.log(response.data);
  return response.data;
}

export const createCategorie = async (body: CategoryFormData): Promise<getCategorieCreated> => {
  const response = await axios.post(`${api}/categories`, JSON.stringify(body), { headers });
  console.log(response)
  return response.data;
}

export const deleteCategorie = async (id: number): Promise<getCategorieDeleted> => {
  const response = await axios.delete(`${api}/categories/${id}`);
  return response.data;
}