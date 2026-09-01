import Botao from "@/components/Botao/botao";
import CampoDeTexto from "@/components/CampoDeTexto/CampoDeTexto";
import { CreateAccount } from "@/service/user.service";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Cadastro = () => {
  const router = useRouter();
  const headerHeight = useHeaderHeight();

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [confirmarSenha, setConfirmarSenha] = useState<string>("");

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

  const regex_nome = /^[A-Za-zÀ-ÿ]+(?:\s[A-Za-zÀ-ÿ]+)*$/;
  const [isErrorInNome, setIsErrorInNome] = useState<boolean>(false);

  useEffect(() => {
    if (nome == "") {
      setIsErrorInNome(false);
    } else {
      if (!regex_nome.test(nome)) {
        setIsErrorInNome(true);
      } else {
        setIsErrorInNome(false);
      }
    }
  }, [nome]);

  const [isErrorInConfirmarSenha, setIsErrorInConfirmarSenha] =
    useState<boolean>(false);

  useEffect(() => {
    if (confirmarSenha == "") {
      setIsErrorInConfirmarSenha(false);
    } else {
      if (confirmarSenha != senha) {
        setIsErrorInConfirmarSenha(true);
      } else {
        setIsErrorInConfirmarSenha(false);
      }
    }
  }, [confirmarSenha]);

  const onSubmit = async (name: string, email: string, senha: string) => {
    const resposta = await CreateAccount(name, email, senha);
    if (resposta == 201) {
      Alert.alert("Conta criada");
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center">
      <KeyboardAvoidingView
        className="flex-1 w-full items-center"
        behavior="padding"
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView
          className="w-full"
          contentContainerClassName="items-center pb-8"
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-2xl mb-4">Criar conta</Text>
          <View className="gap-6">
            <CampoDeTexto
              label="Nome"
              value={nome}
              isError={isErrorInNome}
              setValue={setNome}
              placeholder="Digite seu nome"
              textInputClassName="w-80"
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
            />
            <CampoDeTexto
              label="E-mail"
              value={email}
              setValue={setEmail}
              errorMessage="E-mail invalido"
              placeholder="Digite o e-mail"
              isError={isErrorInEmail}
              textInputClassName="w-80"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              returnKeyType="next"
            />
            <CampoDeTexto
              label="Senha"
              value={senha}
              setValue={setSenha}
              errorMessage="Senha invalida"
              placeholder="Digite sua senha"
              isError={isErrorInSenha}
              textInputClassName="w-80"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              returnKeyType="next"
            />
            <CampoDeTexto
              label="Confirme a senha"
              value={confirmarSenha}
              setValue={setConfirmarSenha}
              errorMessage="As senhas devem ser iguais"
              placeholder="Confirme sua senha"
              isError={isErrorInConfirmarSenha}
              textInputClassName="w-80"
              secureTextEntry
              autoCapitalize="none"
              autoComplete="password-new"
              returnKeyType="done"
            />
            <View className="flex-row justify-center">
              <Botao
                className="w-20"
                children={
                  <View className="justify-center items-center">
                    <Text className="text-white text-xl">Criar</Text>
                  </View>
                }
                disabled={
                  isErrorInEmail ||
                  isErrorInSenha ||
                  isErrorInConfirmarSenha ||
                  isErrorInNome ||
                  email == "" ||
                  senha == "" ||
                  nome == "" ||
                  confirmarSenha == ""
                    ? true
                    : false
                }
                onPress={() => {
                  onSubmit(nome, email, senha);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Cadastro;
