import { Image, StyleSheet, View } from "react-native";

const Cabecalho = () => {
  return (
    <View style={estilo.container}>
      <Image
        source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
        width={50}
        height={50}
      />
    </View>
  );
};

const estilo = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A212E",
    padding: 16,
  },
});

export default Cabecalho;
