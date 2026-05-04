import { Pressable, StyleSheet, Text } from "react-native";
interface BotaoProps {
  funcao: () => void;
}
const Botao = ({ funcao }: BotaoProps) => {
  return (
    <Pressable style={estilo.botao} onPress={() => funcao()}>
      <Text style={estilo.label}>Entrar</Text>
    </Pressable>
  );
};

const estilo = StyleSheet.create({
  botao: {
    width: 200,
    height: 50,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#5ED3F3",

    borderRadius: 20,

    marginTop: 20,
  },

  label: {
    fontSize: 18,
  },
});

export default Botao;
