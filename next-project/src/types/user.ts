import { loginSchema } from "@/schemas/auth.schema"
import { z } from "zod"

export type UserDTO =  z.infer<typeof loginSchema>


