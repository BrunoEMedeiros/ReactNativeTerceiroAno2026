import Botao from "@/components/Botao/botao";
import CampoTextHookForm from "@/components/CampoTextoHookForm/CampoTextoHookForm";
import StyledLinearGradient from "@/components/StyledLinearGradient/StyledLinearGradient";
import "@/global.css";
import useIndexViewModel from "@/ViewModel/useIndexViewModel";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const App = () => {
  const { fontsLoaded, fontError, handleSubmit, onSubmit, control } =
    useIndexViewModel();

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
