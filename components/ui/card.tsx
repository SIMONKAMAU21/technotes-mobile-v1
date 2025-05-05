import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

interface CardProps {
  count?: number;
  bgColor: string;
  label?: string;
  icon?: string;
  color?: string;

}

export const Card = ({ count, bgColor, label, icon,color }: CardProps) => {
  return (
    <View className={`p-4 rounded-lg  w-[48%] ${bgColor}`}>
        <View className="flex-row items-center gap-2">
        <Text className="text-white text-lg font-bold">{count}</Text>
        <Ionicons name={icon} size={24} color={color} />
        </View>
      <Text className="text-white">{label}</Text>
    </View>
  );
};
