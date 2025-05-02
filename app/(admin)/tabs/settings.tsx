import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { CustomButton } from "@/components/ui/customButton";
import { useRouter } from "expo-router";
export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const router = useRouter()
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
          } p-4 shadow-sm`}
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
        <CustomButton children="Logout" onPress={() => {router.push('/(auth)/signIn')}} />
      </ScrollView>
    </SafeAreaView>
  );
}
