import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import Updateprofile from "@/components/ui/updateprofile";
import { useUserStore } from "@/store";
import { useAppState } from "@/store/actions";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";

export default function ProfileScreen() {
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
 


 

  return (
    <SafeAreaView className="flex-1 mt-[7%]">
      <WPSuccess
        visible={globalSuccess?.visible}
        description={globalSuccess?.description}
      />
      <WPError
        visible={globalError?.visible}
        description={globalError?.description}
      />
      <HeaderWithIcon title="Profile" />
   
        <Updateprofile />
    </SafeAreaView>
  );
}
