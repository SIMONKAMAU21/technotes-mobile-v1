import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface HeaderWithIconProps {
  title: string;
  showBackButton?: boolean;
  bgColor?: string;
  leftIcon?: string;
  url: string;
  onLeftPress?: () => void;
}

export const InboxHeaderWithIcon = ({
  title,
  showBackButton = true,
  url
}: HeaderWithIconProps) => {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between w-full border px-2 py-2 bg-white">
      <View className="flex-row items-center flex-1   gap-2 w-[40%]">
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        )}
        <Image
          source={ url ? {uri:url}:require("../../assets/images/user-placeholder.png")}
          className="w-10 h-10 rounded-full "
        />
        <Text className="text-xl font-bold">{title}</Text>
      </View>
      <View className=" w-[60%] flex-row flex-1 self-end justify-end items-center gap-2">
        <Image
          source={require("../../assets/images/school2.png")}
          className="w-8 h-8"
        />
      </View>
    </View>
  );
};
