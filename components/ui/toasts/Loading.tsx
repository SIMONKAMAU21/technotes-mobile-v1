import { View, Text, ActivityIndicator, SafeAreaView } from "react-native";
import React from "react";

const Loading = () => {
  return (
        <ActivityIndicator size="small" animating={true} color="#EF8F02" />
  );
};

export default Loading;