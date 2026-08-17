import z from "zod";

export const signinSchema = z.object({
  email: z.email("E-mail invalido"),
  password: z.string().min(6, "Minimo de 6 caracteres"),
});

export type SigninSchema = z.infer<typeof signinSchema>;
