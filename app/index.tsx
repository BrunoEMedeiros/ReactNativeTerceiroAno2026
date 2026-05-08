import { logIn } from "@/api/features/logIn";
import Botao from "@/components/Botao/Botao";
import Cabecalho from "@/components/Cabecalho/Cabecalho";
import CampoTexto from "@/components/CampoTexto/CampoTexto";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";

const App = () => {
  const [loaded, error] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter-Light": require("../assets/fonts/Inter_18pt-Light.ttf"),
    "Playwrite-NO": require("../assets/fonts/PlaywriteNO-Regular.ttf"),
  });

  const [email, setEmail] = useState<string>("teste@teste.com");
  const [senha, setSenha] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isSenhaValid, setIsSenhaValid] = useState<boolean>(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    if (emailRegex.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }, [email]);

  function validarSenha(texto: string) {
    if (texto.length < 5) {
      setIsSenhaValid(false);
    } else {
      setIsSenhaValid(true);
    }
  }

  if (!loaded && !error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={estilo.main}>
      <Cabecalho />
      <View style={estilo.fieldsContainer}>
        <CampoTexto
          placeholder="Digite seu email"
          label="E-mail"
          texto={email}
          setTexto={setEmail}
          isValid={isEmailValid}
          errorMessage="E-mail inválido"
        />
        <CampoTexto
          placeholder="Digite sua senha"
          label="Senha"
          texto={senha}
          setTexto={validarSenha}
          isValid={isSenhaValid}
          errorMessage="Senha deve ter no minimo 5 caracteres"
        />
        <Botao
          title="Entrar"
          funcao={async () => {
            const response = await logIn(email, senha);
            if (response) {
            }
            return Alert.alert("Usuário ou senha incorretas");
          }}
          disabled={!isEmailValid && !isSenhaValid ? true : false}
        />
      </View>
    </View>
  );
};

const estilo = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#989BA1",
    fontFamily: "Playwrite-NO",
  },
  fieldsContainer: {
    flex: 1,
    marginTop: 170,
    alignItems: "center",
    gap: 30,
  },
});

export default App;
