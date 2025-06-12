import {
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import { screenOptions } from "@/constants/animation";
import { initializeUserStore, useUserStore } from "@/store";
import { ThemeContext, ThemeProvider } from "@/store/themeContext";
import { Theme } from "@/constants/theme";

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
  const userData = useUserStore((state) => state.userData);
  const isHydrated = useUserStore((state) => state.isHydrated);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    initializeUserStore();
  }, []);

  useEffect(() => {
    if (loaded && isHydrated) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isHydrated]);

  // Show loading until everything is ready
  if (!loaded || !isHydrated) {
    return null;
  }

  // Determine initial route based on user state
  const getInitialRoute = () => {
    if (!userData) {
      return "(auth)";
    }
    // Add onboarding check if needed
    // if (!userData.hasCompletedOnboarding) {
    //   return "(onbording)";
    // }
    return "(onbording)"; // or whatever your default authenticated route is
  };
    const { theme } = useContext(ThemeContext);
    const color = Theme[theme];

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <Stack
            initialRouteName={getInitialRoute()}
            screenOptions={screenOptions}
          >
            <Stack.Screen name="(onbording)" options={screenOptions} />
            <Stack.Screen name="(auth)" options={screenOptions} />
            <Stack.Screen name="(admin)" options={screenOptions} />
            <Stack.Screen name="(student)" options={screenOptions} />
            <Stack.Screen name="(teacher)" options={screenOptions} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="(profile)" options={screenOptions} />
            <Stack.Screen name="(users)" options={screenOptions} />
            <Stack.Screen name="(inbox)" options={screenOptions} />
          </Stack>
          <StatusBar style="light" backgroundColor={color.statusBar} />
        </PaperProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
