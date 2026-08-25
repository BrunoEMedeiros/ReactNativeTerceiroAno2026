import Header from "@/components/Header/Header";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ header: Header }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="cadastro" options={{ header: Header }} />
    </Stack>
  );
}
