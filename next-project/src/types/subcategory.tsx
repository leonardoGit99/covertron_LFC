
import { createSubCategorySchema, updateSubCategorySchema } from "@/schemas/subCategory.schema";
import { z } from "zod";

export type CreateSubCategory = z.infer<typeof createSubCategorySchema>;

export type UpdateSubCategory = z.infer<typeof updateSubCategorySchema>;

export type SubCategory = CreateSubCategory & {
  id: number;
  categoryName: string;
};



export type SubCategoryWithoutID = Omit<SubCategory, 'id'>



export type SubCategories = SubCategory[];

export type SubCategoriesResponse = {
  total: number;
  subCategories: SubCategories;
};