import { View, Text } from "react-native";
import React from "react";
import { useAppState } from "@/store/actions";
import WPSuccess from "../success/WPSuccess";
import WPError from "../error/WPError";

const Toasts = () => {
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
  return (
    <View>
      <WPSuccess
        visible={globalSuccess?.visible}
        description={globalSuccess?.description}
      />
      <WPError
        visible={globalError?.visible}
        description={globalError?.description}
      />
    </View>
  );
};

export default Toasts;
