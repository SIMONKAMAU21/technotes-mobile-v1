import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import "react-native-reanimated";
import "../global.css";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import { screenOptions } from "@/constants/animation";
import { initializeUserStore, useUserStore } from "@/store";
import { ThemeContext, ThemeProvider } from "@/store/themeContext";
import { Theme } from "@/constants/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
  const userData = useUserStore((state) => state.userData);
  const isHydrated = useUserStore((state) => state.isHydrated);
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Initialize user store only once
  useEffect(() => {
    initializeUserStore();
  }, []);

  // Hide splash screen when everything is ready
  useEffect(() => {
    if (loaded && isHydrated) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isHydrated]);

  const getInitialRoute = () => {
    if (!userData) return "(auth)";
    return "(onbording)";
  };

  // Show loading until everything is ready - moved to end to ensure hooks are always called
  if (!loaded || !isHydrated) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <InnerApp getInitialRoute={getInitialRoute} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

// Child component that safely uses the context
function InnerApp({ getInitialRoute }) {
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];

  return (
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
  );
}