import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from './logo';
import {useFocusEffect, useRouter } from 'expo-router'
import { useUserStore } from '@/store';
interface HeaderDashboardProps {
  userName: string | undefined;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  userImage: string | undefined;
  onMenuPress: () => void;
}

const HeaderDashboard = ({ userName, isDarkMode, onThemeToggle ,userImage, onMenuPress}: HeaderDashboardProps) => {
  const router = useRouter()
  const refreshUserData = useUserStore(state => state.refreshUserData)

  const goProfile = () =>{
   router.push("/(profile)/profile")
  }


// useFocusEffect(()=>{
//   refreshUserData()
// },[refreshUserData])
  return (
    <View className="flex-row justify-between items-center p-2 bg-white  dark:bg-white">
      <TouchableOpacity onPress={goProfile}>
      {userImage ? (
        <Image source={{ uri: userImage }} className="w-10 h-10 rounded-full" />

      ):(
        <Image source={require("../../assets/images/user-placeholder.png")} className="w-10 h-10 rounded-full" />

      )}
      </TouchableOpacity>
    
        {/* <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu-outline" size={32} color={isDarkMode ? '#fff' : '#fff'} />
          </TouchableOpacity> */}
        <View className='text-lg font-semibold tems-center flex-row'>
        <Text className="text-lg font-semibold  dark:text-dark text-secondary">welcome </Text><Text className='text-lg font-semibold'>{userName}</Text>
        </View>
          <Logo className='w-10 h-10'/>
      
      {/* <TouchableOpacity onPress={onThemeToggle}>
        <Ionicons 
          name={isDarkMode ? 'sunny-outline' : 'moon-outline'} 
          size={24} 
          color={isDarkMode ? '#fff' : '#000'}
        />
      </TouchableOpacity> */}
    </View>
  );
};
export default HeaderDashboard;
