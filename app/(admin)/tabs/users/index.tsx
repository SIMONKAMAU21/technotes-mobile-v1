import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Modal, Alert } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useGetUsers } from '../../data';
import { useRouter } from 'expo-router';

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

  const handleEdit = () => {
    setShowOptions(false);
    // TODO: Implement edit functionality
    Alert.alert('Edit User', `Edit ${selectedUser.name}'s details`);
  };

  const handleDelete = () => {
    setShowOptions(false);
    Alert.alert(
      'Delete User',
      `Are you sure you want to delete ${selectedUser.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // TODO: Implement delete functionality
            console.log('Delete user:', selectedUser.id);
          }
        }
      ]
    );
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

      <Modal
        visible={showOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowOptions(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/50 justify-center items-center"
          activeOpacity={1}
          onPress={() => setShowOptions(false)}
        >
          <View className={`w-80 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4`}>
            <Text className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedUser?.name}
            </Text>
            
            <TouchableOpacity
              onPress={handleEdit}
              className={`p-3 rounded-md mb-2 ${isDarkMode ? 'bg-blue-600' : 'bg-blue-500'}`}
            >
              <Text className="text-white text-center font-medium">Edit User</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleDelete}
              className={`p-3 rounded-md ${isDarkMode ? 'bg-red-600' : 'bg-red-500'}`}
            >
              <Text className="text-white text-center font-medium">Delete User</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
