import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Alert } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { CustomButton } from "@/components/ui/customButton";
import CustomInput from "@/components/ui/customInput";
import { Logo } from "@/components/ui/logo";
import { useAddUser } from "../../data";
import { RadioButton } from "react-native-paper";
import { UserAdd } from "@/components/ui/userAdd";
import { useAppState } from "@/store/actions";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";

export default function UserAddScreen() {
  const state = useAppState()
  const globalError = state.globalError
  const globalSuccess = state.globalSuccess
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { mutate: addUser, isLoading, isError } = useAddUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    gender: "",
    address: "",
  });

  const handleAddUser = async (formData: any) => {
    // TODO: Implement API call to add user
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      gender: formData.gender,
      address: formData.address,
    };
    try {
      if (!formData) {
        return null;
      } else {
        const response = await addUser(payload);
        if (response !== null) {
          // router.back();
        } else {
          return null;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 mt-[7%]">
       <WPSuccess visible={globalSuccess?.visible} description={globalSuccess?.description}/>
       <WPError visible={globalError?.visible} description={globalError?.description} /> 
      <HeaderWithIcon
        title="Add New User"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />
      <ScrollView
        className={`${isDarkMode ? "bg-bg" : "bg-background "} flex-1`}
        contentContainerClassName="p-4"
      >
        <View className="mb-6">
          <Text
            className={`text-2xl font-bold ${
              isDarkMode ? "text-black" : "text-gray-900"
            }`}
          >
            Add New User
          </Text>
          <Text
            className={`mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Enter information for new user
          </Text>
        </View>
        <View className="flex-row justify-center">
          <Logo />
        </View>

        <View
          className={`rounded-lg ${
            isDarkMode ? "bg-white" : "bg-white"
          } p-4 shadow-sm   flex-1`}
        >
          <Text
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-black" : "text-gray-900"
            }`}
          >
            User Information
          </Text>
          <UserAdd onSubmit={handleAddUser}  isLoading={isLoading} isError={isError} initialData={formData}/>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
