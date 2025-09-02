import z from "zod";

export const loginSchema = z.object({
  email: z.string()
    .min(1, { message: "El email es obligatorio" })
    .email({ message: "Email inválido" }),
  password: z.string()
    .min(1, { message: "La Contraseña es obligatoria" }),
})

