import { cn } from "@/lib/cn";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

type BotaoProps = TouchableOpacityProps & {
  className?: string;
  children: React.ReactNode;
};

const Botao = ({ className, children }: BotaoProps) => {
  return (
    <TouchableOpacity
      className={cn("bg-blue-600 p-5 rounded-full min-w-40", className)}
    >
      {children}
    </TouchableOpacity>
  );
};
export default Botao;
