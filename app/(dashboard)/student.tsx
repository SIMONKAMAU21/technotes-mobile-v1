import { SafeAreaView, View, Text } from 'react-native';
import { Stack } from 'expo-router';
import { CustomButton } from "@/components/ui/customButton";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import React, { useState } from 'react';

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('courses');

  const renderSidebar = () => {
    return (
      <View className="w-64 bg-gray-100 h-full p-4">
        <Text className="text-xl font-bold mb-6">Student Dashboard</Text>
        <CustomButton 
          children="My Courses"
          onPress={() => setActiveSection('courses')}
        //   className="mb-2"
        />
        <CustomButton
          children="Assignments" 
          onPress={() => setActiveSection('assignments')}
        //   className="mb-2"
        />
        <CustomButton
          children="Grades"
          onPress={() => setActiveSection('grades')}
        //   className="mb-2"
        />
        <CustomButton
          children="Resources"
          onPress={() => setActiveSection('resources')}
        //   className="mb-2"
        />
      </View>
    );
  };

  const renderContent = () => {
    switch(activeSection) {
      case 'courses':
        return (
          <View className="p-6">
            <Text className="text-2xl font-bold">My Courses</Text>
            <Text className="mt-4">View your enrolled courses and class materials.</Text>
          </View>
        );
      case 'assignments':
        return (
          <View className="p-6">
            <Text className="text-2xl font-bold">Assignments</Text>
            <Text className="mt-4">View and submit your assignments.</Text>
          </View>
        );
      case 'grades':
        return (
          <View className="p-6">
            <Text className="text-2xl font-bold">Grades</Text>
            <Text className="mt-4">Check your grades and academic progress.</Text>
          </View>
        );
      case 'resources':
        return (
          <View className="p-6">
            <Text className="text-2xl font-bold">Learning Resources</Text>
            <Text className="mt-4">Access study materials and learning resources.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <Stack.Screen 
        options={{
          headerShown: false
        }}
      />
      <HeaderWithIcon title="Student Dashboard" bgColor="tertiary" />
      <View className="flex-1 flex-row">
        {renderSidebar()}
        <View className="flex-1 bg-white">
          {renderContent()}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StudentDashboard;
