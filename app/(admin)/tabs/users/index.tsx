import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Modal, Alert } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useGetUsers } from '../../data';
import { useRouter } from 'expo-router';
import { CustomButton } from '@/components/ui/customButton';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from '@/components/ui/logo';

export default function UsersScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const { data, isLoading, error } = useGetUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  const handleUserPress = (user) => {
    console.log('user', user)
    setSelectedUser(user);
    router.push({
      pathname: '/(admin)/tabs/users/[userdata]',
      params: { userdata: JSON.stringify(user) }
    });
  };

  return (
    <SafeAreaView className="flex-1 mt-10">
      <ScrollView 
        className={`flex-1 ${isDarkMode ? 'bg-white' : 'bg-white'}`}
        contentContainerClassName="p-4"
      >
        <View className="mb-6">
          <Text className={`text-2xl font-bold ${isDarkMode ? 'text-black' : 'text-gray-900'}`}>
            Users
          </Text>
          <Text className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage system users
          </Text>
        </View>

        <View className={`rounded-l bg-white p-4 shadow-sm`}>
          <Text className={`text-lg font-semibold ${isDarkMode ? 'text-black' : 'text-gray-900'} mb-4`}>
            User List
          </Text>

          {isLoading ? (
            <ActivityIndicator size="large" color={isDarkMode ? '#4299E1' : '#000'} />
          ) : error ? (
            <Text className={`${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
              Error loading users
            </Text>
          ) : (
            <View>
              {data?.map((user: any) => (
                <TouchableOpacity
                  key={user.id}
                  onPress={() => handleUserPress(user)}
                  className={`flex-row items-center p-3 mb-2 rounded-md ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <View className="flex-1">
                    <Text className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {user.name}
                    </Text>
                    <Text className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {user.email}
                    </Text>
                  </View>
                  <Text className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {user.role}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View className="absolute bottom-6 right-6">
        <CustomButton
          onPress={() => router.push('/(admin)/tabs/users/userAdd')}
          // style={{ borderRadius: 30, width: 60, height: 60 }}
        >
          <View className='flex-row justify-center items-center'>
          <Logo className='w-10 h-10'/>
          <Ionicons name="add" size={24} color="white" />
          </View>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
}
