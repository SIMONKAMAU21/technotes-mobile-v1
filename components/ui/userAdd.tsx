import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import CustomInput from "./customInput";
import { CustomButton } from "./customButton";
import { RadioButton } from "react-native-paper";
import { RadioInputs } from "./radioInputs";
import { Picker } from "@react-native-picker/picker";

interface UserFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  address: string;
}

interface UserAddProps {
  initialData?: UserFormData;
  onSubmit: (data: UserFormData) => void;
  submitButtonText?: string;
  isLoading?: boolean;
  isError?: boolean;
}

export const UserAdd = ({
  initialData,
  onSubmit,
  submitButtonText = "Add User",
  isLoading,
  isError,
}: UserAddProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    email: "",
    phone: "",
    role: "",
    gender: "",
    address: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <ScrollView className="flex-1">
      <View className="p-4">
        <CustomInput
          label="Name"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Enter name"
        />

        <CustomInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Enter email"
          keyboardType="email-address"
        />

        <CustomInput
          label="Phone"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
        />

        <CustomInput
          label="Address"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          placeholder="Enter address"
        />

        <View className="mb-4">
          <Text className="mb-2 font-bold">Role</Text>
          <View className="border border-gray-300 rounded">
            <Picker
              selectedValue={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
              style={{ color: 'black', }}
            >
              <Picker.Item label="Select a role" value="" />
              <Picker.Item label="Admin" value="admin" />
              <Picker.Item label="Teacher" value="teacher" />
              <Picker.Item label="Student" value="student" />
              <Picker.Item label="Parent" value="parent" />
            </Picker>
          </View>
        </View>

        <View className="flex-row items-center gap-4 text-black">
          <RadioInputs
            label="Gender"
            options={["Male", "Female", "Other"]}
            value={formData.gender}
            onValueChange={(value) =>
              setFormData({ ...formData, gender: value })
            }
          />
        </View>
        <CustomButton
          disabled={isLoading}
          loading={isLoading}
          onPress={handleSubmit}
        >
          {submitButtonText}
        </CustomButton>
      </View>
    </ScrollView>
  );
};
