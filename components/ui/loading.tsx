import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import React, { useContext } from "react";
import { Logo, Logo1 } from "./logo";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";

const LoadingIndicator = () => {
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];
  return (
    <SafeAreaView
      className="flex-1 "
      style={{ backgroundColor: color.background }}
    >
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" animating={true} color="#EF8F02" />
        {/* <Text className="mt-4 text-gray-600">Loading...</Text> */}
        {theme === "dark" ? <Logo size={40} /> : <Logo1 size={40} />}
      </View>
    </SafeAreaView>
  );
};

export default LoadingIndicator;
