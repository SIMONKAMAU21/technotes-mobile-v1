import React from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function UsersScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView className="flex-1 mt-10">
        
    <ScrollView 
      className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      contentContainerClassName="p-4"
    >
      <View className="mb-6">
        <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Users
        </Text>
        <Text className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Manage system users
        </Text>
      </View>

      <View className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 shadow-sm`}>
        <Text className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          User List
        </Text>
        <Text className={`mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          View and manage user accounts
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}
