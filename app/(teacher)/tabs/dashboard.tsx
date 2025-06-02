// import React from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   SafeAreaView,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { useColorScheme } from "@/hooks/useColorScheme";
// import HeaderDashboard from "@/components/ui/headerDashbord";
// import { useUserData } from "@/utils";
// import { router } from "expo-router";

// export default function DashboardScreen() {
//   const colorScheme = useColorScheme();
//   const isDarkMode = colorScheme === "light";
//   const { user } = useUserData();
//   const handleLogout = () => {
//     router.replace("/(auth)/signIn");
//   };
//   return (
//     <SafeAreaView className="flex-1 mt-10">
//       <HeaderDashboard
//         userName={user?.name}
//         isDarkMode={isDarkMode}
//         onThemeToggle={() => {}}
//         userImage={user?.photo}
//         onMenuPress={() => {}}
//       />
//       <ScrollView
//         className={` ${isDarkMode ? "bg-gray-900" : "bg-bg "}`}
//         contentContainerClassName="p-2"
//       >
//         <Text onPress={handleLogout}>log out</Text>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { CustomButton } from "@/components/ui/customButton";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import React, { useState } from 'react';
import { useUserData } from '@/utils';
import HeaderDashboard from '@/components/ui/headerDashbord';
import { useColorScheme } from '@/hooks/useColorScheme.web';

const TeacherDashboard = () => {
    const { user } = useUserData();
  
  const [activeSection, setActiveSection] = useState('classes');
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "light";
  const renderSidebar = () => {
    return (
      <View className="w-[30%] bg-gray-100 h-full p-4">
        <Text className="text-xl font-bold mb-6">Teacher Dashboard</Text>
        <CustomButton 
          children="My Classes"
          onPress={() => setActiveSection('classes')}
          className="mb-2 text-primary font-bold"
        />
        <CustomButton
          children="Assignments"
          onPress={() => setActiveSection('assignments')}
          className="mb-2"
        />
        <CustomButton
          children="Student Progress"
          onPress={() => setActiveSection('progress')}
          className="mb-2"
        />
        <CustomButton
          children="Resources"
          onPress={() => setActiveSection('resources')}
          className="mb-2"
        />
      </View>
    );
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'classes':
        return (
          <View className="p-6">
            <Text className="text-2xl font-bold">My Classes</Text>
            <Text className="mt-4">View and manage your classes here.</Text>
          </View>
        );
      case 'assignments':
        return (
          <View className="p-6">
            <Text className="text-2xl font-bold">Assignments</Text>
            <Text className="mt-4">Create and manage assignments for your classes.</Text>
          </View>
        );
      case 'progress':
        return (
          <View className="p-6">
            <Text className="text-2xl font-bold">Student Progress</Text>
            <Text className="mt-4">Track and analyze student performance.</Text>
          </View>
        );
      case 'resources':
        return (
          <View className="p-6">
            <Text className="text-2xl font-bold">Teaching Resources</Text>
            <Text className="mt-4">Access teaching materials and resources.</Text>
          </View>
        );
      default:
        return null;
    }
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
     <ScrollView className='flex-1 bg-bg' contentContainerStyle={{ flexGrow: 1 }}>
       <View className="flex-1 flex-row">
        {renderSidebar()}
        <View className="flex-1 bg-white">
          {renderContent()}
        </View>
      </View>
     </ScrollView>
    </SafeAreaView>
  );
};

export default TeacherDashboard;
