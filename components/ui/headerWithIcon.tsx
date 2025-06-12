import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";
import { Logo, Logo1 } from "./logo";

interface HeaderWithIconProps {
  title: string;
  showBackButton?: boolean;
  bgColor?: string;
  leftIcon?: string;
  onLeftPress?: () => void;
}

export const HeaderWithIcon = ({
  title,
  showBackButton = true,
}: HeaderWithIconProps) => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];
  return (
    <View
      className="flex-row items-center justify-between w-full  px-4 py-2 "
      style={{
        backgroundColor: theme === "dark" ? color.background : color.bg,
      }}
    >
      <View className="flex-row items-center justify-between gap-2 w-full">
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={color.text} />
          </TouchableOpacity>
        )}
        <Text className="text-xl font-bold" style={{ color: color.text }}>
          {title}
        </Text>
        {theme === "light" ? (
          <Logo1 className="w-10 h-10" />
        ) : (
          <Logo className="w-10 h-10" />
        )}
      </View>
    </View>
  );
};
