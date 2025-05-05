import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, Switch } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CustomButton } from "@/components/ui/customButton";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const router = useRouter();

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
      <ScrollView
        className={`flex-1 ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
        contentContainerClassName="p-4"
      >
        <View className="mb-6">
          <Text
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Settings
          </Text>
          <Text
            className={`mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Manage your application settings
          </Text>
        </View>

        <View
          className={`rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-4 shadow-sm mb-4`}
        >
          <Text
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            App Information
          </Text>
          <Text
            className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Version 1.0.0
          </Text>
        </View>

        <View
          className={`rounded-lg ${
            isDarkMode ? "bg-gray-800" : "bg-white"
          } p-4 shadow-sm mb-4`}
        >
          <View className="flex-row justify-between items-center">
            <Text
              className={`text-lg font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Dark Mode
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
            />
          </View>
        </View>

        <CustomButton children="Logout" onPress={() => {router.push('/(auth)/signIn')}} />
      </ScrollView>
    </SafeAreaView>
  );
}
