import { api } from "@/api/axios-config";
import Botao from "@/components/Botao/Botao";
import Cabecalho from "@/components/Cabecalho/Cabecalho";
import CampoTexto from "@/components/CampoTexto/CampoTexto";
import axios from "axios";
import { useFonts } from "expo-font";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";

const App = () => {
  const [loaded, error] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter-Light": require("../assets/fonts/Inter_18pt-Light.ttf"),
    "Playwrite-NO": require("../assets/fonts/PlaywriteNO-Regular.ttf"),
  });

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  async function logIn() {
    try {
      const { data, status } = await api.post("/login", {
        email: email,
        senha: senha,
      });

      if (status == 200) {
        return Alert.alert("Bem vindo");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          Alert.alert("Usuário ou senha incorretos");
        }
      }
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
        />
        <CampoTexto
          placeholder="Digite sua senha"
          label="Senha"
          texto={senha}
          setTexto={setSenha}
        />
        <Botao
          funcao={() => {
            logIn();
          }}
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
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
});

export default App;
