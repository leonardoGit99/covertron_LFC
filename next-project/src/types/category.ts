import { categorySchema } from "@/schemas/category.schema";
import { z } from "zod";

export type NewCategory = z.infer<typeof categorySchema>;

export type Category = NewCategory & {
  id: number,
}



export type Categories = Category[]

export type CategoriesResponse = {
  total: number;
  categories: Categories;
};