import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, TouchableOpacity, Modal, Alert } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';
import { CustomButton } from '@/components/ui/customButton';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from '@/components/ui/logo';
import { Avatar } from 'react-native-paper';
import { useAppState } from '@/store/actions';
import WPSuccess from '@/components/ui/success/WPSuccess';
import WPError from '@/components/ui/error/WPError';
import UsersScreen from '@/app/(users)/users'; // Make sure this path is correct

export default function Users() {
  const state = useAppState();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const router = useRouter();

  const handleUserPress = (user) => {
    setSelectedUser(user);
    router.push({
      pathname: '/(admin)/tabs/users/userdata',
      params: { userdata: JSON.stringify(user) }
    });
  };

  return (
    <View className="flex-1 bg-bg">
      
      {/* Main Content - UsersScreen */}
      <View className="flex-1">
        <UsersScreen />
      </View>

      {/* Floating Add Button */}
      <View className="absolute bottom-6 right-6">
        <CustomButton
          onPress={() => router.push('/(admin)/tabs/users/userAdd')}
        >
          <View className='flex-row justify-center items-center'>
            <Logo className='w-10 h-10'/>
            <Ionicons name="add" size={24} color="white" />
          </View>
        </CustomButton>
      </View>
    </View>
  );
}