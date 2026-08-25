import { signinSchema, SigninSchema } from "@/schemas/signin.schema";
import { Signin } from "@/service/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { Alert } from "react-native";

export default function useIndexViewModel() {
  const router = useRouter();
  //Importando fontes externas
  const [fontsLoaded, fontError] = useFonts({
    "GoogleSans-Regular": require("@/assets/fonts/GoogleSans-Regular.ttf"),
    "GoogleSans-Bold": require("@/assets/fonts/GoogleSans-Bold.ttf"),
  });

  //Chamando a splashScreen para carregar no momento certo
  SplashScreen.preventAutoHideAsync();

  //A splash screen sera retirada apenas quando as fontes terminarem de carregar
  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hide();
      if (fontError) throw fontError;
    }
  }, [fontsLoaded, fontError]);

  // Controler do react hook form
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema) as unknown as Resolver<SigninSchema>,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Usando a função useMutation para operações POST, PUT, PATCH e DELETE
  const signinUser = useMutation<number, AxiosError, SigninSchema>({
    mutationFn: ({ email, password }: SigninSchema) =>
      Signin({ email, password }),
    onSuccess: () => {
      router.navigate("/home");
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        Alert.alert("Usuário ou senha incorretos");
      } else {
        console.error("Erro ao fazer login", error);
      }
    },
  });

  const onSubmit = (data: SigninSchema) => {
    signinUser.mutate(data);
  };
  return {
    fontsLoaded,
    fontError,
    handleSubmit,
    onSubmit,
    control,
  };
}
