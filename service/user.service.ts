import api from "@/lib/axios.config";
import { SigninSchema } from "@/schemas/signin.schema";

export async function Signin({ email, password }: SigninSchema) {
  const { status } = await api.post("/signin", { email, password });
  return status;
}

export async function BasicSignin(email: string, password: string) {
  const { status } = await api.post("/signin", { email, password });
  return status;
}
