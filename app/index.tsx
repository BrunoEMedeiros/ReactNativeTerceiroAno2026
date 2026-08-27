import Botao from "@/components/Botao/botao";
import CampoDeTexto from "@/components/CampoDeTexto/CampoDeTexto";
import StyledLinearGradient from "@/components/StyledLinearGradient/StyledLinearGradient";
import "@/global.css";
import { BasicSignin } from "@/service/user.service";
import { Link, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";

const App = () => {
  //Iniciando hook de roteamento manual do expo router
  const router = useRouter();

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
        <View className="flex-row justify-center m-6">
          <Link href={"/cadastro"}>
            <Text>Cadastre-se</Text>
          </Link>
        </View>
      </View>
    </StyledLinearGradient>
  );
};
export default App;
