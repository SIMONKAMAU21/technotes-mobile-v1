import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import React from "react";
import { Logo } from "./logo";

const LoadingIndicator = () => {
  return (
    <SafeAreaView className="flex-1 bg-bg">
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" animating={true} color="#EF8F02" />
        {/* <Text className="mt-4 text-gray-600">Loading...</Text> */}
        <Logo/>
      </View>
    </SafeAreaView>
  );
};

export default LoadingIndicator;