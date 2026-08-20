import Botao from "@/components/Botao/botao";
import CampoTextHookForm from "@/components/CampoTextoHookForm/CampoTextoHookForm";
import StyledLinearGradient from "@/components/StyledLinearGradient/StyledLinearGradient";
import "@/global.css";
import { signinSchema, SigninSchema } from "@/schemas/signin.schema";
import { Signin } from "@/service/user.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { ActivityIndicator, Text, View } from "react-native";

const App = () => {
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
      console.log("Bem vindo");
    },
    onError: (error) => {
      if (error.response?.status === 401) {
        console.error("Usuario ou senha incorretos");
      } else {
        console.error("Erro ao fazer login", error);
      }
    },
  });

  const onSubmit = async (data: SigninSchema) => {
    await signinUser.mutateAsync(data);
  };

  //Equanto as fontes não carregam, ira exibir um circulo de carregamento apenas para efeito visual
  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator />;
  }

  return (
    <StyledLinearGradient
      colors={["#7a28cb", "#494368"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 justify-center items-center"
    >
      <View className="bg-[#c299eb] p-6 rounded-2xl">
        <View className="mb-8 items-center">
          <Text className="font-sans text-black text-2xl">Entrar</Text>
        </View>
        <View className="gap-6">
          <CampoTextHookForm label="E-mail" name="email" control={control} />
          <CampoTextHookForm label="Senha" name="password" control={control} />
        </View>
        <View className="items-center mt-8">
          <Botao
            className="w-20"
            children={
              <View className="justify-center items-center">
                <Text className="text-white text-xl">Entrar</Text>
              </View>
            }
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </StyledLinearGradient>
  );
};
export default App;
