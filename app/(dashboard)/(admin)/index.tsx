import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { useUserData } from "@/utils";
import HeaderDashboard from "@/components/ui/headerDashbord";
import { Sidebar } from "@/components/ui/sidebar";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUserData();

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <View className="p-6  flex-1">
            <Text className="text-2xl font-bold">Overview</Text>
            <Text className="mt-4">
              Welcome to the admin dashboard overview.
            </Text>
          </View>
        );
      case "users":
        return (
          <View className="p-6">
            <Text className="text-2xl font-bold">Users Management</Text>
            <Text className="mt-4">Manage your users here.</Text>
          </View>
        );
      case "settings":
        return (
          <View className="p-6">
            <Text className="text-2xl font-bold">Settings</Text>
            <Text className="mt-4">Configure your dashboard settings.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SafeAreaView className="flex-1">
      <HeaderDashboard 
        userImage={user?.photo} 
        userName={`Welcome ${user?.name}`} 
        isDarkMode={false} 
        onThemeToggle={() => {}}
        onMenuPress={toggleSidebar}
        isVisible={isSidebarOpen}
        onClose={toggleSidebar}
      />
      <View className="flex-1 flex-row">
        {isSidebarOpen && <Sidebar isDarkMode={false} isVisible={isSidebarOpen} onClose={toggleSidebar} />}
        <ScrollView className="flex-1 bg-white">
          {renderContent()}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AdminDashboard;
