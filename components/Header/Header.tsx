import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React from "react";
import { Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Header = (props: NativeStackHeaderProps) => {
  const podeVoltar = props.navigation.canGoBack();
  return (
    <SafeAreaView
      className={`px-4 bg-[#c299eb] flex-row items-center gap-6 ${podeVoltar == false && "justify-center"}`}
    >
      {podeVoltar == true ? (
        <Pressable onPress={() => props.navigation.goBack()}>
          <Ionicons name="arrow-back" size={32} color="black" />
        </Pressable>
      ) : null}
      <Image
        className={`h-24 w-24 ${podeVoltar == true && "ml-[110px]"}`}
        source={require("@/assets/images/react-logo.png")}
      />
    </SafeAreaView>
  );
};
export default Header;
