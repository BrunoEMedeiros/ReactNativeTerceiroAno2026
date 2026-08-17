import { cn } from "@/lib/cn";
import React, { useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
type CampoTextoProps = TextInputProps & {
  label: string;
  regex: RegExp;
  errorMessage: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  textInputClassName?: string;
};

const CampoTextoGenerico = ({
  label,
  regex,
  errorMessage,
  className = "",
  labelClassName = "",
  textInputClassName = "",
  placeholder = "",
}: CampoTextoProps) => {
  const [campo, setCampo] = useState<string>("");
  const [error, setError] = useState("");

  const handleChange = (text: string) => {
    setCampo(text);
    if (text === "") {
      setError("");
    } else if (!regex.test(text)) {
      setError(errorMessage);
    } else {
      setError("");
    }
  };

  return (
    <View className={cn("bg-white rounded-md gap-2 p-4 w-72 ", className)}>
      <Text className={cn("text-black text-lg", labelClassName)}>{label}</Text>
      <TextInput
        className={cn("text-black font-sans text-base", textInputClassName)}
        placeholder={placeholder}
        value={campo}
        onChangeText={handleChange}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {error !== "" && (
        <Text className="text-red-600 font-sans mt-2">{error}</Text>
      )}
    </View>
  );
};

export default React.memo(CampoTextoGenerico);
