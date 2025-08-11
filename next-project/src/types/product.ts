import { productSchema } from '@/schemas/product.schema';
import { z } from 'zod';

// ADMIN USER
export type CreateProductDTO = z.infer<typeof productSchema>;

export interface Product extends CreateProductDTO {
  id: number,
  state: string,
  categoryName: string,
  subCategoryName: string,
  images: string[],
  createdAt: string,
  updatedAt: string,
  discountedPrice: string
};

export type ProductDetailAdminDTO = Omit<Product, 'categoryName' | 'subCategoryName' | 'createdAt' | 'updatedAt' | 'discountedPrice'>

export type ProductsResponseAdmin = {
  total: number;
  products: Product[];
};



// NORMAL USER
export type ProductSummary = Omit<Product, 'description' | 'categoryId' | 'subCategoryId' | 'state' | 'categoryName' | 'subCategoryName' | 'images' | 'createdAt' | 'updatedAt'> & {
  image: string
}

export type ProductDetailDTO = Omit<Product, 'categoryName' | 'subCategoryName' | 'updatedAt' | 'state'>

export type ProductsResponse = {
  total: number;
  products: ProductSummary[];
};