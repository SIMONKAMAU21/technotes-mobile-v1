import React, { useState } from "react";
import { View, Text, ScrollView, SafeAreaView, Alert } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { CustomButton } from "@/components/ui/customButton";
import CustomInput from "@/components/ui/customInput";
import { Logo } from "@/components/ui/logo";
import { useAddUser } from "../../data";

export default function UserAddScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { mutate: addUser, isLoading, isError } = useAddUser();
  const [formData, setFormData] = useState({
    name: "Talia",
    email: "Talia@gmail.com",
    phone: "0712345678",
    role: "admin",
    gender: "male",
    address: "Kibutha, Kenya",
  });

  const handleAddUser = async () => {
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
        if (response) {
          router.back();
        } else {
          return null;
        }
      }
    } catch (error) {
      return null;
    }
  };

  return (
    <SafeAreaView className="flex-1 mt-10">
      <HeaderWithIcon
        title="Add New User"
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
          } p-4 shadow-sm`}
        >
          <Text
            className={`text-lg font-semibold mb-4 ${
              isDarkMode ? "text-black" : "text-gray-900"
            }`}
          >
            User Information
          </Text>

          <View className="mb-4">
            <CustomInput
              label="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter name"
            />
          </View>

          <View className="mb-4">
            <CustomInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Enter email"
              keyboardType="email-address"
            />
          </View>

          <View className="mb-4">
            <CustomInput
              label="Phone"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View className="mb-4">
            <CustomInput
              label="Role"
              value={formData.role}
              onChangeText={(text) => setFormData({ ...formData, role: text })}
              placeholder="Enter role"
            />
          </View>

          <View className="mb-4">
            <CustomInput
              label="Gender"
              value={formData.gender}
              onChangeText={(text) =>
                setFormData({ ...formData, gender: text })
              }
              placeholder="Enter gender"
            />
          </View>

          <View className="mb-4">
            <CustomInput
              label="Address"
              value={formData.address}
              onChangeText={(text) =>
                setFormData({ ...formData, address: text })
              }
              placeholder="Enter address"
              multiline
            />
          </View>

          <CustomButton
            disabled={isLoading}
            loading={isLoading}
            onPress={handleAddUser}
            style={{ marginTop: 20 }}
          >
            Add User
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
