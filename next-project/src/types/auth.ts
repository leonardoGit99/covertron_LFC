import { loginSchema } from "@/schemas/auth.schema";
import { z } from "zod";

export type LoginDTO = z.infer<typeof loginSchema>