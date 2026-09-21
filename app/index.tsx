import "@/global.css";
import { obterUserId } from "@/lib/secureStore";
import { Redirect } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const App = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    obterUserId().then((id) => {
      setUserId(id);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return <Redirect href={userId ? "/(tabs)" : "/login"} />;
};

export default App;
