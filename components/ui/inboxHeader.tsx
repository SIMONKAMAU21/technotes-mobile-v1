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
  url: string;
  onLeftPress?: () => void;
}

export const InboxHeaderWithIcon = ({
  title,
  showBackButton = true,
  url
}: HeaderWithIconProps) => {
  const router = useRouter();
 const { theme } = useContext(ThemeContext);
  const color = Theme[theme];

  return (
    <View className="flex-row items-center justify-between w-full  px-2 py-2 "       style={{ backgroundColor:theme==="dark"? color.background :color.bg }}
>
      <View className="flex-row items-center flex-1 gap-2 w-[40%]">
        {showBackButton && (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={color.text} />
          </TouchableOpacity>
        )}
        <Image
          source={ url ? {uri:url}:require("../../assets/images/user-placeholder.png")}
          className="w-10 h-10 rounded-full "
        />
        <Text style={{color:color.text}} className="text-xl font-bold">{title}</Text>
      </View>
      <View className=" w-[60%] flex-row flex-1 self-end justify-end items-center gap-2">
          {theme === "dark" ? (
               <Logo className="w-10 h-10" />
             ) : (
               <Logo1 className="w-10 h-10" />
             )}
      </View>
    </View>
  );
};
