import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Button } from "react-native-paper";
import { CustomButton } from "@/components/ui/customButton";
import { getUserToken, useUserData } from "@/utils";

export default function OnboardingScreen() {
  const router = useRouter();
  const {user} = useUserData();

  useEffect(() => {
    const checkUserData = async () => {
      const userToken = await getUserToken();
      console.log("userData", user);
      if (user && userToken) {
        if (user) {
          switch (user.role) {
            case "admin":
              router.replace("/(dashboard)/(admin)/index");
              break;
            case "teacher":
              router.replace("/(dashboard)/teacher");
              break;
            case "student":
              router.replace("/(dashboard)/student");
              break;
            default:
              router.replace("/(auth)/signIn");
          }
        }
      }else{
        router.replace("/(auth)/signIn");
      }
    };
    checkUserData();
  });

  return (
    <SafeAreaView className="flex-1 justify-between items-center p-8 bg-white">
      <ScrollView className="flex-1">
        <View className=" justify-center mt-[50%] items-center">
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
            onPress={() => router.push("/(auth)/signIn")}
          >
            Sign in to continue
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
