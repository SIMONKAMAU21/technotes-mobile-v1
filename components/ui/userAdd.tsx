import React, { useState, useEffect } from "react";
import { View, ScrollView } from "react-native";
import CustomInput from "./customInput";
import { CustomButton } from "./customButton";

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
          label="Gender"
          value={formData.gender}
          onChangeText={(text) => setFormData({ ...formData, gender: text })}
          placeholder="Enter gender"
        />

        <CustomInput
          label="Address"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          placeholder="Enter address"
        />

        <CustomInput
          label="Role"
          value={formData.role}
          onChangeText={(text) => setFormData({ ...formData, role: text })}
          placeholder="Enter role"
        />

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
