import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native';
import { useUserData } from '@/utils';
import HeaderDashboard from '@/components/ui/headerDashbord';
import { Sidebar } from '@/components/ui/sidebar';

const Users = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useUserData();

  // Mock data - in real app would come from API/database
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'teacher' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'student' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'student' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'teacher' },
  ];

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
        {isSidebarOpen && (
          <Sidebar
            isDarkMode={false}
            isVisible={isSidebarOpen}
            onClose={toggleSidebar}
          />
        )}
        <ScrollView className="flex-1 bg-white p-6">
          <Text className="text-2xl font-bold mb-6">Users Management</Text>
          
          <View className="bg-gray-50 rounded-lg p-4">
            {/* Table Header */}
            <View className="flex-row border-b border-gray-200 pb-3">
              <Text className="flex-1 font-bold">Name</Text>
              <Text className="flex-1 font-bold">Email</Text>
              <Text className="flex-1 font-bold">Role</Text>
              <Text className="w-20 font-bold">Actions</Text>
            </View>

            {/* Table Body */}
            {users.map((user) => (
              <View key={user.id} className="flex-row border-b border-gray-100 py-3">
                <Text className="flex-1">{user.name}</Text>
                <Text className="flex-1">{user.email}</Text>
                <Text className="flex-1 capitalize">{user.role}</Text>
                <View className="w-20 flex-row">
                  <TouchableOpacity className="mr-2">
                    <Text className="text-blue-500">Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text className="text-red-500">Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Users;