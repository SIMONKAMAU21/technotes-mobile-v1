import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Logo, Logo1 } from "./logo";
import { useFocusEffect, useRouter } from "expo-router";
import { useUserStore } from "@/store";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";
interface HeaderDashboardProps {
  userName: string | undefined;
  userImage: string | undefined;
}

const HeaderDashboard = ({
  userName,
  userImage,
}: HeaderDashboardProps) => {
  const router = useRouter();

  const goProfile = () => {
    router.push("/(profile)/profile");
  };
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];

  // useFocusEffect(()=>{
  //   refreshUserData()
  // },[refreshUserData])
  return (
    <View
      className="flex-row justify-between items-center p-2 bg-white shadow-2xl"
      style={{ backgroundColor:theme==="dark"? color.background :color.bg }}
    >
      <TouchableOpacity onPress={goProfile}>
        {userImage ? (
          <Image
            source={{ uri: userImage }}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <Image
            source={require("../../assets/images/user-placeholder.png")}
            className="w-10 h-10 rounded-full"
          />
        )}
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={onMenuPress}>
          <Ionicons name="menu-outline" size={32} color={isDarkMode ? '#fff' : '#fff'} />
          </TouchableOpacity> */}
      <View className="text-lg font-semibold tems-center flex-row">
        <Text className="text-lg font-semibold  dark:text-dark text-secondary">
          welcome{" "}
        </Text>
        <Text className="text-lg font-semibold" style={{ color: color.text }}>
          {userName}
        </Text>
      </View>
      {theme === "dark" ? (
        <Logo className="w-10 h-10" />
      ) : (
        <Logo1 className="w-10 h-10" />
      )}

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
