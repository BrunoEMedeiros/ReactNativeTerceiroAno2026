import { ButtonProps, Pressable, StyleSheet, Text } from "react-native";

interface BotaoProps extends ButtonProps {
  funcao: () => void;
  title: string;
}
const Botao = ({ title, funcao, ...props }: BotaoProps) => {
  return (
    <Pressable style={estilo.botao} onPress={() => funcao()} {...props}>
      <Text style={estilo.label}>{title}</Text>
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
