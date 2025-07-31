import { productSchema } from '@/schemas/product.schema';
import { z } from 'zod';


export type NewProduct = z.infer<typeof productSchema>;

export type Product = NewProduct & {
  id: number,
  state: string,
  imgs: string[]
};

export type Products = Product[];