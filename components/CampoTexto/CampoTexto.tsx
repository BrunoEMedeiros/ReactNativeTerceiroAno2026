import { Dispatch } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface CampoTextoProps {
  label: string;
  placeholder: string;
  texto: string;
  setTexto: Dispatch<React.SetStateAction<string>>;
}

const CampoTexto = ({
  label,
  placeholder,
  texto,
  setTexto,
}: CampoTextoProps) => {
  return (
    <View style={estilo.container}>
      <Text style={estilo.label}>{label}</Text>
      <TextInput
        style={estilo.textInput}
        placeholder={placeholder}
        placeholderTextColor={"#999999"}
        value={texto}
        onChangeText={(e) => setTexto(e)}
      />
    </View>
  );
};

const estilo = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 20,
    color: "white",
    fontFamily: "Inter-Bold",
  },
  textInput: {
    padding: 16,
    borderRadius: 14,
    width: 300,
    color: "white",

    fontSize: 18,
    backgroundColor: "#1A212E",
  },
});

export default CampoTexto;
