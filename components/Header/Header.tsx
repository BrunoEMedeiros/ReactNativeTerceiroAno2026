import { obterUserId, removerUserId } from "@/lib/secureStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { NativeStackHeaderProps, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Header = (props: NativeStackHeaderProps) => {
  const router = useRouter();
  const podeVoltar = props.navigation.canGoBack();

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    obterUserId().then((userId) => {
      if (userId) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    });
  }, []);

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
      {logged ? (
        <Pressable
          onPress={async () => {
            await removerUserId();
            setLogged(false);
            if (router.canDismiss()) {
              router.dismissAll();
            }
            router.replace("/login");
          }}
        >
          <Text>Sair</Text>
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
};
export default Header;
