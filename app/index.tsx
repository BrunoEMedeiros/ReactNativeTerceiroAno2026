import Botao from "@/components/Botao/Botao";
import Cabecalho from "@/components/Cabecalho/Cabecalho";
import CampoTexto from "@/components/CampoTexto/CampoTexto";
import { useFonts } from "expo-font";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const App = () => {
  const [loaded, error] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter-Light": require("../assets/fonts/Inter_18pt-Light.ttf"),
    "Playwrite-NO": require("../assets/fonts/PlaywriteNO-Regular.ttf"),
  });

  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

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
        <Botao funcao={() => {}} />
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
