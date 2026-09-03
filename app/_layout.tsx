import { useFonts } from "expo-font";
import { SplashScreen, Stack, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Header from "@/components/Header/Header";

export default function RootLayout() {
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

  //Equanto as fontes não carregam, ira exibir um circulo de carregamento apenas para efeito visual
  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator />;
  }

  return (
    <Stack screenOptions={{ header: Header }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="cadastro" options={{ header: Header }} />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="posts/newPost" />
    </Stack>
  );
}
