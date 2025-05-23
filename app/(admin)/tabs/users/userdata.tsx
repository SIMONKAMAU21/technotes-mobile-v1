import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { UserAdd } from "@/components/ui/userAdd";
import { Ionicons } from "@expo/vector-icons";
import { useDeleteUser, useUpdateUser } from "../../data";
import { useAppActions, useAppState } from "@/store/actions";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import Loading from "@/components/ui/toasts/Loading";

export default function UserDetailsScreen() {
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const params = useLocalSearchParams();
  const userData = JSON.parse(params.userdata as string);
  const { setGlobalError, setGlobalSuccess } = useAppActions();

  const {
    mutate: deleteUser,
    isLoading,
    isError,
  } = useDeleteUser(userData._id);
  const {
    mutate: updateUser,
    isLoading: isUpdateLoading,
    isError: updateError,
  } = useUpdateUser(userData._id);

  const handleUpdateUser = async (formData: any) => {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      gender: formData.gender,
      address: formData.address,
    };

    try {
      await updateUser(payload);
     
    } catch (error) {
      setGlobalError({
        visible: true,
        description: "Erroe updating user",
      });
      //   Alert.alert("Error", "Failed to update user details");
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await deleteUser(userData._id);
      console.log("User deleted successfully:", response);
      router.back();
    } catch (error) {
      console.error("Error deleting user:", error);
      Alert.alert("Error", "Failed to delete user");
    }
  };

  return (
    <SafeAreaView className="flex-1 mt-10 bg-bg">
      <WPSuccess
        visible={globalSuccess?.visible}
        description={globalSuccess?.description}
      />
      <WPError
        visible={globalError?.visible}
        description={globalError?.description}
      />
      <HeaderWithIcon
        title="User Details"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />
      <ScrollView
        className={`${isDarkMode ? "bg-bg" : "bg-background"} `}
        contentContainerClassName="p-2"
      >
        <View className="mb-6">
          <Text
            className={`text-2xl font-bold ${
              isDarkMode ? "text-black" : "text-gray-900"
            }`}
          >
            Edit User Details
          </Text>
        </View>

        <View
          className={`rounded-lg ${
            isDarkMode ? "bg-white" : "bg-white"
          } p-1 shadow-sm`}
        >
          <View className="flex-row justify-between bg-primary w-full h-[20%] p-3 rounded-lg ">
            <Text
              className={`mt-1 ${
                isDarkMode ? "text-gray-100" : "text-gray-600"
              }`}
            >
              {userData.name}
            </Text>
            <View className="items-center bg-bg p-1 w-40 h-40  shadow-lg rounded-full ">
              <Image
                alt="user photo"
                className="w-full h-full rounded-full "
                source={
                  userData?.photo
                    ? { uri: userData?.photo }
                    : require("../../../../assets/images/user-placeholder.png")
                }
              />
            </View>
            {isLoading ? (
              <Loading />
            ) : (
              <Ionicons
                onPress={handleDeleteUser}
                name="trash"
                size={24}
                color="white"
              />
            )}
          </View>

          <UserAdd
            onSubmit={handleUpdateUser}
            initialData={userData}
            isLoading={isUpdateLoading}
            isError={updateError}
            submitButtonText="Update User Details"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
