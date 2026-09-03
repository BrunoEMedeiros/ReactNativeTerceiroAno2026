import CartaoDePostagem, {
  Postagem,
} from "@/components/CartaoDePostagem/CartaoDePostagem";
import api from "@/lib/axios.config";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";

const Home = () => {
  const router = useRouter();

  const [postagens, setPostagens] = useState<Postagem[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  const buscarPostagens = useCallback(async () => {
    const { data } = await api.get<Postagem[]>("/posts");
    setPostagens(data);
  }, []);

  useFocusEffect(
    useCallback(() => {
      buscarPostagens().finally(() => setCarregando(false));
    }, [buscarPostagens])
  );

  const aoAtualizar = async () => {
    setAtualizando(true);
    await buscarPostagens();
    setAtualizando(false);
  };

  return (
    <View className="flex-1">
      {carregando ? (
        <ActivityIndicator className="flex-1" size="large" />
      ) : (
        <FlatList
          data={postagens}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ padding: 16, gap: 16 }}
          renderItem={({ item }) => <CartaoDePostagem postagem={item} />}
          refreshControl={
            <RefreshControl refreshing={atualizando} onRefresh={aoAtualizar} />
          }
          ListEmptyComponent={
            <Text className="text-center text-gray-400 mt-10">
              Nenhuma postagem ainda
            </Text>
          }
        />
      )}

      <View className="bg-blue-600 rounded-full w-20 h-20 absolute bottom-6 right-6 items-center justify-center">
        <Pressable onPress={() => router.push("/posts/newPost")}>
          <FontAwesome name="plus" size={32} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

export default Home;
