import { cn } from "@/lib/cn";
import React from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

type CampoTextHookFormProps<T extends FieldValues> = {
  label: string;
  errorMessage?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  textInputClassName?: string;
  name: Path<T>;
  control: Control<T>;
};

const CampoTextHookForm = <T extends FieldValues>({
  name,
  control,
  label,
  errorMessage,
  className = "",
  labelClassName = "",
  textInputClassName = "",
  placeholder = "",
  ...textInputProps
}: CampoTextHookFormProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <View className={cn("bg-white rounded-md gap-2 p-4 w-72 ", className)}>
      <Text className={cn("text-black text-lg", labelClassName)}>{label}</Text>
      <TextInput
        className={cn("text-black font-sans text-base", textInputClassName)}
        placeholder={placeholder}
        autoCapitalize="none"
        onChangeText={field.onChange}
        {...textInputProps}
      />
      {error ? (
        <Text className="text-red-600 font-sans mt-2">{error.message}</Text>
      ) : null}
    </View>
  );
};

export default CampoTextHookForm;
