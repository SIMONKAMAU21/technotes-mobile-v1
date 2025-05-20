import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, Switch } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CustomButton } from "@/components/ui/customButton";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useUserData } from "@/utils";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import Updateprofile from "@/components/ui/updateprofile";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const router = useRouter();
const {user} = useUserData()
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

  return (
    <SafeAreaView className="flex-1 mt-10">
      <HeaderWithIcon title="Profile"/>
      <ScrollView
        className={`flex-1 ${isDarkMode ? "bg-bg" : "bg-gray-50"} text-white`}
        contentContainerClassName="p-4"
      >
        <View className=" text-white">
          
       
        </View>
        <Updateprofile userDetails={user}/>
        <Text className="text-gray-400">
            {user?.name}
        </Text>
        <Text className="text-gray-400">
            {user?.email}
        </Text>
        <Text className="text-gray-400">
            {user?.role}
        </Text>

        {/* <CustomButton children="Logout" onPress={() => {router.push('/(auth)/signIn')}} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}
