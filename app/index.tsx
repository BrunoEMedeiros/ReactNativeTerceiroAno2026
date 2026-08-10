import React from "react";
import { View, Text } from "react-native";
import "../global.css";
import Botao from "@/components/botao/botao";
const App = () => {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-white">Primeiria tela com Native Wind</Text>
      <Botao className="mt-4" children={"Clique em mim"} />
    </View>
  );
};

export default App;
