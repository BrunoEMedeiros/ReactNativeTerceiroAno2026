import api from "@/lib/axios.config";
import { SigninSchema } from "@/schemas/signin.schema";

//Avançado - react hook form
export async function Signin({ email, password }: SigninSchema) {
  const { status } = await api.post("/signin", { email, password });
  return status;
}

//Basico
export async function BasicSignin(email: string, password: string) {
  const { status } = await api.post("/signin", { email, password });
  return status;
}
