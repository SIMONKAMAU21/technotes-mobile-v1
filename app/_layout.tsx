import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import { screenOptions } from "@/constants/animation";
import { initializeUserStore } from "@/store";

SplashScreen.preventAutoHideAsync();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 0,
      refetchOnWindowFocus: true,
    },
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  useEffect(() => {
    initializeUserStore()
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "light" ? DefaultTheme : DarkTheme}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <Stack>
            {/* Entry routes */}
            <Stack.Screen name="(onbording)" options={screenOptions} />
            <Stack.Screen name="(auth)" options={screenOptions} />
            {/* <Stack.Screen name="(tabs)" options={screenOptions} /> */}
            {/* Role-based dashboards (loaded but routed only via onboarding/login) */}
            <Stack.Screen name="(admin)" options={screenOptions} />
            <Stack.Screen name="(student)" options={screenOptions} />
            <Stack.Screen name="(teacher)" options={screenOptions} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="(profile)" options={screenOptions} />

          </Stack>
          <StatusBar style="light" backgroundColor="white" />
        </PaperProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
