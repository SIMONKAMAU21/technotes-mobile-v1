import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import React from "react";

const LoadingIndicator = () => {
  return (
    <SafeAreaView className="">
        <ActivityIndicator animating={true} color={"#EF8F02"} />
    </SafeAreaView>
  );
};

export default LoadingIndicator;
