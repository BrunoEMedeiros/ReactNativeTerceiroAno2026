import { PressableProps } from "react-native";

export type BotaoProps = PressableProps & {
  className?: string;
  children: React.ReactNode;
};
