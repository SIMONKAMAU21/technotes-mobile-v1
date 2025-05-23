import { CustomButton } from "@/components/ui/customButton";
import CustomInput from "@/components/ui/customInput";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { Logo } from "@/components/ui/logo";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { TextInput, View, Text, SafeAreaView, ScrollView } from "react-native";
import { useLogin } from "./data";
import { deleteUserData, setUserToken } from "@/utils";
import { initializeUserStore, useUserStore } from "@/store";
import { useFocusEffect } from "@react-navigation/native";

const SignIn = () => {
  const [email, setEmail] = useState("admin24@gmail.com");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const { mutate: mutateLogin } = useLogin();
  const setUser = useUserStore((state) => state.setUserData);



  const handleSignIn = async () => {
    // await deleteUserData()
    try {
      setLoading(true);
      const payload = {
        email,
        password,
      };

      mutateLogin(payload, {
        onSuccess: async(response: any) => {

        await  setUser(response.user);
         await setUserToken(response.token);
          // Based on user role, redirect to appropriate dashboard
          switch (response.user.role) {
            case "admin":
              router.replace("(admin)/tabs/dashboard" as any);
              break;
            case "teacher":
              router.replace("(teacher)/tabs/dashboard" as any);
              break;
            case "student":
              router.replace("(student)/tabs/dashboard" as any);
              break;
            default:
            router.replace("/(auth)/signIn");
          }

        },
        onError: (error) => {
          console.error("Sign in error:", error);
          // Handle error appropriately
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-full bg-white">
      <HeaderWithIcon title="Sign In" bgColor="secondary" />
      <ScrollView
        className="flex-1 w-full"
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View className="flex-1 justify-center items-center w-full px-4">
          <Logo size={50} className="w-40 h-40" />
          <Text className="text-center text-lg mb-8">
            Welcome back! Please sign in to continue.
          </Text>

          <View className="w-full max-w-md items-center">
            <CustomInput
              style={{ width: "100%" }}
              label="Email"
              value={email}
              onChangeText={setEmail}
            />
            <CustomInput
              style={{ width: "100%" }}
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <CustomButton
            mode="contained"
            style={{
              backgroundColor: "#4299e1",
              width: "100%",
              maxWidth: 400,
              marginTop: 20,
            }}
            onPress={handleSignIn}
          >
            {loading ? "Signing in..." : "Sign in"}
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
