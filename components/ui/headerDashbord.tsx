import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Logo } from './logo';

interface HeaderDashboardProps {
  userName: string;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  userImage: string;
  onMenuPress: () => void;
}

const HeaderDashboard = ({ userName, isDarkMode, onThemeToggle ,userImage, onMenuPress}: HeaderDashboardProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <View className="flex-row justify-between items-center p-2 bg-white  dark:bg-white">
        <Image source={{ uri: userImage }} className="w-10 h-10 rounded-full" />
        {/* <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu-outline" size={32} color={isDarkMode ? '#fff' : '#fff'} />
          </TouchableOpacity> */}
        <Text className="ml-2 text-lg font-semibold dark:text-dark">{userName}</Text>
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
