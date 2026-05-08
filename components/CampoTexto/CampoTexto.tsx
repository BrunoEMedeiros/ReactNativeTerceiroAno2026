import { StyleSheet, Text, TextInput, View } from "react-native";

interface CampoTextoProps {
  label: string;
  placeholder: string;
  texto: string;
  // setTexto: React.Dispatch<SetStateAction<string>>;
  setTexto: Function;
  isValid: boolean;
  errorMessage: string;
}

const CampoTexto = ({
  label,
  placeholder,
  texto,
  setTexto,
  isValid,
  errorMessage,
}: CampoTextoProps) => {
  return (
    <View style={estilo.container}>
      <Text style={estilo.label}>{label}</Text>
      <TextInput
        style={[estilo.textInput, !isValid && estilo.errorBorder]}
        placeholder={placeholder}
        placeholderTextColor={"#999999"}
        // value={texto}
        onChangeText={(texto) => setTexto(texto)}
      />
      {!isValid && <Text style={estilo.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const estilo = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 3,
  },
  label: {
    fontSize: 20,
    color: "white",
    fontFamily: "Inter-Regular",
  },
  textInput: {
    padding: 16,
    borderRadius: 14,
    width: 300,
    color: "white",

    fontSize: 18,
    backgroundColor: "#1A212E",
  },

  errorBorder: {
    borderWidth: 2,
    borderColor: "#D70040",
  },
  errorText: {
    color: "#D70040",
  },
});

export default CampoTexto;
