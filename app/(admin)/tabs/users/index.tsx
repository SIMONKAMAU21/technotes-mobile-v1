import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Modal, Alert } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useGetUsers } from '../../data';
import { useRouter } from 'expo-router';
import { CustomButton } from '@/components/ui/customButton';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from '@/components/ui/logo';
import { Avatar } from 'react-native-paper';

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
    <SafeAreaView className="flex-1 mt-10 bg-gray-100">
      <ScrollView 
        className={`flex-1 ${isDarkMode ? 'bg-bg' : 'bg-bg'}`}
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
                    isDarkMode ? 'bg-bg' : 'bg-bg'
                  }`}
                >
                  <View className="flex-1 flex-row items-center gap-2">
                    {user?.photo ? (
                      <Avatar.Image
                        size={40}
                        source={{ uri: user?.photo }}
                      />
                    ) : (
                      <Avatar.Text
                      style={{
                        backgroundColor:'#4299E1'
                      }}
                        size={40}
                        label={user?.name.charAt(0)}
                        color={isDarkMode ? 'white' : 'black'}
                      />
                    )}
                    <View className='flex-1'>
                    <Text className={`font-medium ${isDarkMode ? 'text-black' : 'text-gray-900'}`}>
                      {user.name}
                    </Text>
                    <Text className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-100'}`}>
                      {user.email}
                    </Text>
                    </View>
                  </View>
                  <Text className={`${
                    user.role === 'admin' ? 'text-blue-600' :
                    user.role === 'teacher' ? 'text-yellow-600' :
                    user.role === 'student' ? 'text-green-600' :
                    user.role === 'parent' ? 'text-red-600' :
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
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

