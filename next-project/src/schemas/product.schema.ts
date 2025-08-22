import { string, z } from "zod";

export const productSchema = z.object({
  name: z.coerce
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(150, "El nombre no puede tener más de 150 caracteres"),
  description: z.coerce
    .string()
    .trim()
    .max(1000, "La descripción no puede tener más de 1000 caracteres")
    .optional(),
  categoryId: z.coerce
    .number({
      message: "Selecciona una categoría"
    })
    .int()
    .positive({
      message: "Selecciona una categoría"
    }),
  subCategoryId: z.coerce
    .number({
      message: "Selecciona una sub categoría"
    })
    .int()
    .positive({
      message: "Selecciona una sub categoría"
    })
    .refine(
      (val) => val !== null && !isNaN(val),
      { message: "Selecciona una sub categoría" }
    ),
  originalPrice: z.coerce
    .number({
      message: "El precio es obligatorio"
    })
    .int()
    .positive({
      message: "El precio es obligatorio"
    })
    .min(0, "El precio debe ser mayor o igual a 0")
    .max(10000, "El precio no puede ser más de 10000 Bs.")
    .multipleOf(0.01),
  brand: z.coerce
    .string()
    .trim()
    .min(1, "La marca es obligatoria")
    .max(75, "La marca no puede tener más de 75 caracteres"),
  discount: z
    .number({
      invalid_type_error: "El descuento debe ser un número válido"
    })
    .int()
    .min(0, "El descuento no puede ser negativo")
    .max(100, "El descuento no puede ser mayor al 100%")
    .optional(),
  images: z.array(
    z.union([
      z.instanceof(File)
        .refine(
          (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
          { message: "Solo se permiten imágenes JPG, PNG o WEBP" }
        )
        .refine(
          (file) => file.size <= 10 * 1024 * 1024,
          { message: "El tamaño máximo es 10MB" }
        ),
      z.string() // para URLs existentes
    ])
  )
    .min(1, "Debe subir mínimamente una imagen")
    .max(10, "Solo puede subir hasta 10 imágenes")
});