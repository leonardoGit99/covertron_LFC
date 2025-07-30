
import { subCategorySchema } from "@/schemas/subCategory.schema";
import { z } from "zod";

export type NewSubCategory = z.infer<typeof subCategorySchema>;

export type SubCategory = NewSubCategory & {
  id: number;
  categoryName: string;
};



export type SubCategoryWithoutID = Omit<SubCategory, 'id'>

export type SubCategoryWithCategoryName = SubCategory & {
  categoryName: string;
}


export type SubCategories = SubCategory[];

export type SubCategoriesResponse = {
  total: number;
  subCategories: SubCategories;
};