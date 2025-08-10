import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  categoryId: z.coerce.number().int().min(1, "Selecciona una categoría válida").nullable(),
  subCategoryId: z.coerce.number().int().min(1, "Selecciona una sub-categoría válida").nullable(),
  originalPrice: z.coerce.number({
    required_error: "El precio es obligatorio",
    invalid_type_error: "El precio debe ser un número válido"
  }).min(0, "El precio debe ser mayor o igual a 0"),
  brand: z.string({
    message: "La marca es obligatoria",
    required_error: "La marca es obligatoria"
  }).min(2, "La marca debe contener más de 2 caracteres"),
 discount: z.coerce.number({
    invalid_type_error: "El descuento debe ser un número válido"
  }).min(0, "El descuento no puede ser negativo").max(100, "El descuento no puede ser mayor a 100").optional()
});