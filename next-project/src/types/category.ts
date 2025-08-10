import { createCategorySchema, updateCategorySchema } from "@/schemas/category.schema";
import { z } from "zod";

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;

export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>

export type Category = CreateCategoryDTO & {
  id: number,
}
export type Categories = Category[]

export type CategoriesResponse = {
  total: number;
  categories: Categories;
};