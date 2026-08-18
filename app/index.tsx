import Botao from "@/components/Botao/botao";
import CampoDeTexto from "@/components/CampoDeTexto/CampoDeTexto";
import "@/global.css";
import { signinSchema, SigninSchema } from "@/schemas/signin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
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

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isErrorInEmail, setIsErrorInEmail] = useState<boolean>(false);
  const [isErrorInSenha, setIsErrorInSenha] = useState<boolean>(false);

  useEffect(() => {
    if (email == "") {
      setIsErrorInEmail(false);
    } else {
      if (!regex_email.test(email)) {
        setIsErrorInEmail(true);
      } else {
        setIsErrorInEmail(false);
      }
    }
  }, [email]);

  //Equanto as fontes não carregam, ira exibir um circulo de carregamento apenas para efeito visual
  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator />;
  }

  return (
    <View className="bg-white flex-1 justify-center items-center">
      <View className="bg-black border rounded-xl p-4">
        <View className="mb-8 items-center">
          <Text className="font-sans text-black text-2xl">Entrar</Text>
        </View>
        <View className="gap-4">
          <CampoDeTexto
            label="E-mail"
            value={email}
            setValue={setEmail}
            errorMessage="E-mail invalido"
            placeholder="Digite o e-mail"
            isError={isErrorInEmail}
          />
          <CampoDeTexto
            label="Senha"
            value={senha}
            setValue={setSenha}
            errorMessage="Senha invalida"
            isError={isErrorInSenha}
          />
        </View>
        <View className="items-center">
          <Botao className="w-20" children={<Text>Entrar</Text>} />
        </View>
      </View>
    </View>
  );
};
export default App;
