import Header from "@/components/Header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useState } from "react";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ header: Header }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="cadastro" options={{ header: Header }} />
        <Stack.Screen name="home" />
      </Stack>
    </QueryClientProvider>
  );
}
