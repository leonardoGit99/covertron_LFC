import { Category } from "./category"

export type SubCategory = {
  id: number,
  category_id: number
  name: string
  description: string,
}

export type SubCategoryWithoutID = Omit<SubCategory, 'id'>
export type SubCategoryWithCategoryName = SubCategory & {
  category_name: string;
}


export type SubCategories = SubCategory[]