import Botao from "@/components/Botao/botao";
import CampoDeTexto from "@/components/CampoDeTexto/CampoDeTexto";
import StyledLinearGradient from "@/components/StyledLinearGradient/StyledLinearGradient";
import "@/global.css";
import { BasicSignin } from "@/service/user.service";
import { useFonts } from "expo-font";
import { Link, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

const App = () => {
  //Iniciando hook de roteamento manual do expo router
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

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  const regex_email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [isErrorInEmail, setIsErrorInEmail] = useState<boolean>(false);

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

  const regex_senha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const [isErrorInSenha, setIsErrorInSenha] = useState<boolean>(false);
  useEffect(() => {
    if (senha == "") {
      setIsErrorInSenha(false);
    } else {
      if (!regex_senha.test(senha)) {
        setIsErrorInSenha(true);
      } else {
        setIsErrorInSenha(false);
      }
    }
  }, [senha]);

  const onSubmit = async (email: string, senha: string) => {
    const resposta = await BasicSignin(email, senha);
    if (resposta == 200) {
      router.navigate("/home");
    } else {
      Alert.alert("Usuario ou senha incorretos");
    }
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
            placeholder="Digite sua senha"
            isError={isErrorInSenha}
          />
        </View>
        <View className="items-center mt-8">
          <Botao
            className="w-20"
            children={
              <View className="justify-center items-center">
                <Text className="text-white text-xl">Entrar</Text>
              </View>
            }
            disabled={
              isErrorInEmail || isErrorInSenha || email == "" || senha == ""
                ? true
                : false
            }
            onPress={() => onSubmit(email, senha)}
          />
        </View>
        <View>
          <Link href={"/cadastro"}>
            <Text>Cadastre-se</Text>
          </Link>
        </View>
      </View>
    </StyledLinearGradient>
  );
};
export default App;
