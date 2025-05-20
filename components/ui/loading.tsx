import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import React from "react";

const LoadingIndicator = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-bg">
        <ActivityIndicator animating={true} color={"#EF8F02"} />
    </SafeAreaView>
  );
};

export default LoadingIndicator;
