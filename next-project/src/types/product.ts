import { productSchema } from '@/schemas/product.schema';
import { z } from 'zod';


export type NewProduct = z.infer<typeof productSchema>;

export type Product = NewProduct & {
  id: number,
  state: string,
  categoryName: string,
  subCategoryName: string,
  images: string[],
  createdAt: string,
  discountedPrice: string
};

export type Products = Product[];

export type ProductsResponse = {
  total: number;
  products: Products;
};