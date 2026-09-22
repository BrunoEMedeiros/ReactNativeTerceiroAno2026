import { Postagem } from "@/components/CartaoDePostagem/CartaoDePostagem";
import api from "@/lib/axios.config";
import { Image } from "expo-image";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

// routes.post("/posts", async (req, res) => {
//   const { titulo, texto } = req.body;
//   const { name, data, mimetype } = req.files.imagem;

//   console.log(req.files.imagem.size);

//   const [postagem] = await sql`
//     WITH nova_postagem AS (
//       INSERT INTO postagens (titulo, texto) VALUES (${titulo}, ${texto}) RETURNING id
//     )
//     INSERT INTO imagens_postagens (name, data, mimetype, id_postagem)
//     SELECT ${name}, ${data}, ${mimetype}, id FROM nova_postagem
//     RETURNING id_postagem
//   `;

//   return res.status(201).json({ id: postagem.id_postagem });
// });

// routes.get("/posts", async (req, res) => {
//   const pagina = Number(req.query.pagina) || 0;
//   const tamanhoPagina = 20;

//   const posts = await sql`
//     select p.id, p.titulo
//     from postagens as p
//     order by p.created_at desc
//     limit ${tamanhoPagina} offset ${pagina * tamanhoPagina}
//   `;

//   return res.status(200).json(posts);
// });

// routes.get("/posts/:id", async (req, res) => {
//   const { id } = req.params;
//   const posts =
//     await sql`select id, titulo, texto from postagens where id = ${id}`;

//   if (posts.length === 0) {
//     return res.status(404).json({ message: "Postagem não encontrada" });
//   }

//   return res.status(200).json(posts[0]);
// });

// routes.get("/posts/:id/imagem", async (req, res) => {
//   const { id } = req.params;
//   const [imagem] =
//     await sql`select data, mimetype from imagens_postagens where id_postagem = ${id}`;

//   if (!imagem) {
//     return res.status(404).end();
//   }

//   res.set("Content-Type", imagem.mimetype);
//   res.set("Cache-Control", "public, max-age=31536000, immutable");
//   return res.send(imagem.data);
// });

const PostDetailsPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [postagem, setPostagem] = useState<Postagem | null>(null);
  const [carregando, setCarregando] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;

      api
        .get<Postagem>(`/posts/${id}`)
        .then(({ data }) => {
          if (ativo) setPostagem(data);
        })
        .finally(() => {
          if (ativo) setCarregando(false);
        });

      return () => {
        ativo = false;
      };
    }, [id])
  );

  if (carregando || !postagem) {
    return <ActivityIndicator className="flex-1" size="large" />;
  }

  const imagemUri = `${api.defaults.baseURL}/posts/${postagem.id}/imagem`;

  return (
    <View className="flex-1 gap-20">
      <Image
        source={{ uri: imagemUri }}
        style={{ width: "100%", height: 300 }}
        contentFit="cover"
      />
      <View className="p-4 gap-1">
        <Text className="text-black text-xl font-bold">{postagem.titulo}</Text>
        <Text className="text-black text-xl font-bold">{postagem.texto}</Text>
      </View>
    </View>
  );
};

export default PostDetailsPage;
