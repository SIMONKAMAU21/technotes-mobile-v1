import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { CustomButton } from "@/components/ui/customButton";
import CustomInput from "@/components/ui/customInput";
import { UserAdd } from "@/components/ui/userAdd";
import { Ionicons } from "@expo/vector-icons";
import { useDeleteUser, useUpdateUser } from "../../data";

export default function UserDetailsScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const params = useLocalSearchParams();
  const userData = JSON.parse(params.userdata as string);
  const { mutate: deleteUser, isLoading, isError } = useDeleteUser(userData._id);
  const { mutate: updateUser, isLoading: updateLoading, isError: updateError } = useUpdateUser(userData._id);

  const handleUpdateUser = async (formData) => {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      gender: formData.gender,
      address: formData.address,
    };

    try {
      const response = await updateUser(payload);
      console.log("User updated successfully:", response);
      Alert.alert("Success", "User details updated successfully");
      router.back();
    } catch (error) {
      console.error("Error updating user:", error);
      Alert.alert("Error", "Failed to update user details");
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
      <HeaderWithIcon
        title="User Details"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />
      <ScrollView
        className={`${isDarkMode ? "bg-bg" : "bg-background"}`}
        contentContainerClassName="p-4"
      >
        <View className="mb-6">
          <Text
            className={`text-2xl font-bold ${
              isDarkMode ? "text-black" : "text-gray-900"
            }`}
          >
            Edit User Details
          </Text>
          <Text
            className={`mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Update information for user: {userData.name}
          </Text>
        </View>

        <View
          className={`rounded-lg ${
            isDarkMode ? "bg-white" : "bg-white"
          } p-4 shadow-sm`}
        >
          <View className="flex-row justify-between">
            <Text
              className={`text-lg font-semibold mb-4 ${
                isDarkMode ? "text-black" : "text-gray-900"
              }`}
            >
              User Information
            </Text>
            <Ionicons
              onPress={handleDeleteUser}
              name="trash"
              size={24}
              color="black"
            />
          </View>

          <UserAdd
            onSubmit={handleUpdateUser}
            initialData={userData}
            isLoading={updateLoading}
            isError={updateError}
            submitButtonText="Update User Details"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
