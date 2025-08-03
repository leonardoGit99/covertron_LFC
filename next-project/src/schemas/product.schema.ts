import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  categoryId: z.coerce.number().int().min(1, "Selecciona una categoría válida").nullable(),
  subCategoryId: z.coerce.number().int().min(1, "Selecciona una sub-categoría válida").nullable(),
  price: z.coerce.number({
    message: "El precio debe ser un valor numérico",
    required_error: "El precio es obligatorio"
  }).nullable(),
  brand: z.string({
    message: "La marca es obligatoria",
    required_error: "La marca es obligatoria"
  }).min(2, "La marca debe contener más de 2 caracteres"),
  discount: z.coerce.number({
    message: "El descuento debe ser un valor numérico"
  }).nullable()
});