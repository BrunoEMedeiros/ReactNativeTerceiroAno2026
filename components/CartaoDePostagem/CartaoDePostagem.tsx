import { bytesToBase64 } from "@/lib/base64";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export type Postagem = {
  id: number;
  titulo: string;
  texto: string;
  data: { type: "Buffer"; data: number[] };
  mimetype: string;
};

type PostagemCard = Omit<Postagem, "texto">;

type CartaoDePostagemProps = {
  postagem: PostagemCard;
};

const CartaoDePostagem = ({ postagem }: CartaoDePostagemProps) => {
  const router = useRouter();
  const imagemUri = `data:${postagem.mimetype};base64,${bytesToBase64(postagem.data.data)}`;

  return (
    <Pressable
      onPress={() => {
        router.push({
          pathname: "/posts/[id]",
          params: {
            id: postagem.id,
          },
        });
      }}
    >
      <View className="bg-white rounded-xl overflow-hidden">
        <Image
          source={{ uri: imagemUri }}
          style={{ width: "100%", height: 200 }}
          contentFit="cover"
        />
        <View className="p-4 gap-1">
          <Text className="text-black text-xl font-bold">
            {postagem.titulo}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default CartaoDePostagem;
