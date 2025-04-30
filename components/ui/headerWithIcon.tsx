import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface HeaderWithIconProps {
  title: string;
  showBackButton?: boolean;
  bgColor?: string;
}

export const HeaderWithIcon = ({ title, showBackButton = true }: HeaderWithIconProps) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between w-full  rounded-lg px-4 py-2 mt-[5%] bg-white">
      <View className="flex-row items-center justify-between gap-2 w-full">
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        )}
          <Text className="text-xl font-bold">{title}</Text>
        <Image
          source={require("../../assets/images/school2.png")}
          className="w-8 h-8"
        />
      </View>
    </View>
  );
};
