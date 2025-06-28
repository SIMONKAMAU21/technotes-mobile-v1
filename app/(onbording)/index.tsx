import React, { useContext, useEffect } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { CustomButton } from "@/components/ui/customButton";
import { getUserToken } from "@/utils";
import { useUserStore } from "@/store";
import { connectSocket, disconnectSocket } from "@/utils/socket";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import { useAppState } from "@/store/actions";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";
import { Logo, Logo1 } from "@/components/ui/logo";

export default function OnboardingScreen() {
   const { theme } = useContext(ThemeContext);
  const color = Theme[theme];
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
  const userData = useUserStore((state:any) => state.userData);
  const router = useRouter();
// if(!userData ){
//     return ; // or a loading spinner
// }
  useEffect(() => {
    const checkUserData = async () => {
      const userToken = await getUserToken();
      if (userData && userToken) {
        connectSocket();

        switch (userData?.role) {
          case "admin":
            router.replace("/(admin)/tabs/dashboard");
            break;
          case "teacher":
            router.replace("/(teacher)/tabs/dashboard");
            break;
          case "student":
            router.replace("/(student)/tabs/dashboard");
            break;
          default:
            router.replace("/(auth)/signIn");
        }
      } else {
        disconnectSocket();

        router.push("/(auth)/signIn");
      }
    };

    checkUserData();
  }, [userData]); // Run when `user` changes
 
  return (
    <SafeAreaView style={{backgroundColor:color.background}} className="flex-1  justify-between items-center p-8 bg-white">
      <WPSuccess
        visible={globalSuccess?.visible}
        description={globalSuccess?.description}
      />
      <WPError
        visible={globalError?.visible}
        description={globalError?.description}
      />
      <ScrollView className="flex-1">
        <View className="justify-center mt-[50%] items-center">
          {theme === "dark" ? (            <Logo size={50} className="w-40 h-40" />
          ) :(
            <Logo1 size={50} className="w-40 h-40" />
          )}
          <Text style={{color:color.text}} className="text-3xl font-bold text-center mb-4">
            Welcome to the school management App
          </Text>
          <Text className="text-lg text-center text-gray-600 mb-8">
            Your one-stop solution for everything you need
          </Text>
          <Text className="text-base text-center text-gray-500 mb-6">
            Manage your school activities efficiently with our comprehensive
            tools for administrators, teachers and students.
          </Text>
          <Text className="text-base text-center text-gray-500 mb-8">
            Access schedules, grades, assignments and more - all in one place.
          </Text>
        </View>

        <View className="w-full">
          <CustomButton
            mode="outlined"
            style={{ backgroundColor: `var(--color-secondary)`, marginTop: 20 }}
            onPress={() => router.replace("/(auth)/signIn")}
          >
            Sign in to continue
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
