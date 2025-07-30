import z from "zod";

export const subCategorySchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  categoryId: z.coerce.number().int().min(1, "Selecciona una categoría válida"),
});