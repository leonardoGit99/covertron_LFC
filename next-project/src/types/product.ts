import { productSchema } from '@/schemas/product.schema';
import { z } from 'zod';

// Tipo base inferido del esquema
type ProductSchemaInput = z.input<typeof productSchema>; // Entrada del esquema (antes de transformación)
type ProductSchemaOutput = z.output<typeof productSchema>; // Salida del esquema (después de transformación)

// ADMIN USER
export type CreateProductDTO = ProductSchemaOutput;

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
export type ProductSummary = Omit<Product, 'description' | 'categoryId' | 'subCategoryId' | 'state' | 'subCategoryName' | 'images' | 'createdAt' | 'updatedAt'> & {
  image: string
}

export type ProductDetailDTO = Omit<Product, 'categoryName' | 'subCategoryName' | 'updatedAt' | 'state'>

export type ProductsResponse = {
  total: number;
  products: ProductSummary[];
};