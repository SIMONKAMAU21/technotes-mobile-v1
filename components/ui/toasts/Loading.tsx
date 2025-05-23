import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import React from "react";

const Loading = () => {
  return (
    <SafeAreaView className="">
        <ActivityIndicator size="large" animating={true} color="#EF8F02" />
        {/* <Text className="mt-4 text-gray-600">Loading...</Text> */}
    </SafeAreaView>
  );
};

export default Loading;