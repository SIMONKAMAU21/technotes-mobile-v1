import React, { useEffect } from "react";
import { View, Text, Image, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { CustomButton } from "@/components/ui/customButton";
import { getUserToken } from "@/utils";
import { useUserStore } from "@/store";
import { connectSocket, disconnectSocket } from "@/utils/socket";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import { useAppState } from "@/store/actions";

export default function OnboardingScreen() {
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
  const userData = useUserStore((state) => state.userData);
  const router = useRouter();

  useEffect(() => {
    if (userData) {
      connectSocket();
    } else {
      disconnectSocket();
    }
  }, [userData]);

  useEffect(() => {
    const checkUserData = async () => {
      const userToken = await getUserToken();
      if (userData && userToken) {
        switch (userData.role) {
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
        // router.push("/(auth)/signIn");
      }
    };

    checkUserData();
  }, [userData]); // Run when `user` changes

  return (
    <SafeAreaView className="flex-1 border border-red-200 justify-between items-center p-8 bg-white">
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
          <Image
            source={require("../../assets/images/school2.png")}
            className="w-48 h-48 mb-8"
          />
          <Text className="text-3xl font-bold text-center mb-4">
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
