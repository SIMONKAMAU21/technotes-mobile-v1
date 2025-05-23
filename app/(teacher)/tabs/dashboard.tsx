import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import HeaderDashboard from "@/components/ui/headerDashbord";
import { useUserData } from "@/utils";
import { router } from "expo-router";

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "light";
  const { user } = useUserData();
  const handleLogout = () => {
    router.replace("/(auth)/signIn");
  };
  return (
    <SafeAreaView className="flex-1 mt-10">
      <HeaderDashboard
        userName={user?.name}
        isDarkMode={isDarkMode}
        onThemeToggle={() => {}}
        userImage={user?.photo}
        onMenuPress={() => {}}
      />
      <ScrollView
        className={` ${isDarkMode ? "bg-gray-900" : "bg-bg "}`}
        contentContainerClassName="p-2"
      >
        <Text onPress={handleLogout}>log out</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
