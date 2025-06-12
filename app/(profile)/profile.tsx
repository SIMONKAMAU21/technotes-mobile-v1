import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView, SafeAreaView, Switch } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CustomButton } from "@/components/ui/customButton";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { deleteUserData, setUserToken, signOut, useUserData } from "@/utils";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import Updateprofile from "@/components/ui/updateprofile";
import { useUserStore } from "@/store";
import { useAppState } from "@/store/actions";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";

export default function ProfileScreen() {
  const state = useAppState()
  const globalError = state.globalError
  const globalSuccess = state.globalSuccess
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const router = useRouter();
  const user = useUserStore((state) => state.userData);
  const setUser = useUserStore((state) => state.setUserData);
    const { theme } = useContext(ThemeContext);
    const color = Theme[theme];
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await SecureStore.getItemAsync("theme");
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === "dark");
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
    }
  };

  const toggleDarkMode = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await SecureStore.setItemAsync("theme", newTheme ? "dark" : "light");
      // Force app to re-render with new theme
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };
  const logout = async () => {
    setUser(null);
   await signOut()
    // await deleteUserData();
    router.replace("/(auth)/signIn");
  };
  return (
    <SafeAreaView className="flex-1 mt-[7%]">
       <WPSuccess visible={globalSuccess?.visible} description={globalSuccess?.description}/>
       <WPError visible={globalError?.visible} description={globalError?.description} />  
      <HeaderWithIcon title="Profile" />
      <ScrollView
      style={{backgroundColor:color.background}}
        className={`flex-1  text-white`}
        contentContainerClassName="p-4"
      >
        <Updateprofile logout={logout} />
       
      </ScrollView>
    </SafeAreaView>
  );
}
