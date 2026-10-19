import Botao from "@/components/Botao/botao";
import CampoDeTexto from "@/components/CampoDeTexto/CampoDeTexto";
import { Postagem } from "@/components/CartaoDePostagem/CartaoDePostagem";
import SeletorDeImagem from "@/components/SeletorDeImagem/SeletorDeImagem";
import api from "@/lib/axios.config";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Text, View } from "react-native";

const EditarPostagem = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  // A imagem é opcional na edição: se nenhuma for escolhida, mantém a atual
  const [imagem, setImagem] = useState<ImagePicker.ImagePickerAsset | null>(
    null
  );

  const [isTituloError, setIsTituloError] = useState<boolean>(false);
  const [isTextoError, setIsTextoError] = useState<boolean>(false);

  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);

  // Preenche os campos com os dados atuais da postagem
  useEffect(() => {
    api
      .get<Postagem>(`/posts/${id}`)
      .then(({ data }) => {
        setTitulo(data.titulo);
        setTexto(data.texto);
      })
      .catch(() => {
        Alert.alert("Erro", "Não foi possível carregar a postagem");
        router.back();
      })
      .finally(() => setCarregando(false));
  }, [id, router]);

  const salvarPostagem = async () => {
    const tituloInvalido = !titulo;
    const textoInvalido = !texto;

    setIsTituloError(tituloInvalido);
    setIsTextoError(textoInvalido);

    if (tituloInvalido || textoInvalido) return;

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("texto", texto);
    if (imagem) {
      formData.append("imagem", {
        uri: imagem.uri,
        name: imagem.fileName ?? "imagem.jpg",
        type: imagem.mimeType ?? "image/jpeg",
      } as unknown as Blob);
    }

    try {
      setEnviando(true);
      await api.put(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // A rota da imagem usa cache "immutable" e a URL não muda na edição,
      // então limpa o cache do expo-image para a nova imagem aparecer
      if (imagem) {
        await Promise.all([Image.clearMemoryCache(), Image.clearDiskCache()]);
      }

      Alert.alert("Sucesso", "Postagem atualizada com sucesso");
      router.back();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a postagem");
    } finally {
      setEnviando(false);
    }
  };

  if (carregando) {
    return <ActivityIndicator className="flex-1" size="large" />;
  }

  return (
    <View className="flex-1 justify-center items-center">
      <View>
        <Text>Editar postagem</Text>
      </View>
      <View>
        <CampoDeTexto
          label="Titulo"
          value={titulo}
          isError={isTituloError}
          setValue={setTitulo}
          errorMessage="Titulo inválido"
          placeholder="De um titulo para a postagem"
        />
        <CampoDeTexto
          label="Texto"
          value={texto}
          isError={isTextoError}
          setValue={setTexto}
          errorMessage="Texto inválido"
          placeholder="Texto da postagem"
          multiline={true}
          numberOfLines={10}
          textAlignVertical="top"
          textInputClassName="h-60"
        />
        <SeletorDeImagem
          label="Nova imagem (opcional)"
          value={imagem}
          setValue={setImagem}
          isError={false}
        />
      </View>
      <Botao className="mt-4" onPress={salvarPostagem} disabled={enviando}>
        <Text className="text-white text-center font-bold">
          {enviando ? "Salvando..." : "Salvar alterações"}
        </Text>
      </Botao>
    </View>
  );
};

export default EditarPostagem;
