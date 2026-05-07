import axios from "axios";
import { api } from "../api-config";

export async function logIn(email: string, senha: string) {
  try {
    const { data, status } = await api.post("/login", {
      email: email,
      senha: senha,
    });
    if (status == 200) {
      return data;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status == 401) {
        return false;
      }
    }
  }
}
