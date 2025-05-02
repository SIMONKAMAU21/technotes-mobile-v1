import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HeaderWithIcon } from '@/components/ui/headerWithIcon';
import { CustomButton } from '@/components/ui/customButton';
import CustomInput from '@/components/ui/customInput';

export default function UserDetailsScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const params = useLocalSearchParams();
  const userData = JSON.parse(params.userdata as string);
  
  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    phone: userData.phone || '',
    role: userData.role || '',
    gender: userData.gender || '',
    address: userData.address || ''
  });

  const handleUpdateUser = () => {
    // TODO: Implement API call to update user
    console.log('Updated user data:', formData);
    Alert.alert('Success', 'User details updated successfully');
  };

  return (
    <SafeAreaView className="flex-1 mt-10">
      <HeaderWithIcon
        title="User Details"
        leftIcon="arrow-back"
        onLeftPress={() => router.back()}
      />
      <ScrollView
        className={`${isDarkMode ? 'bg-white' : 'bg-white'}`}
        contentContainerClassName="p-4"
      >
        <View className="mb-6">
            <Text className={`text-2xl font-bold ${isDarkMode ? 'text-black' : 'text-gray-900'}`}>
            Edit User Details
          </Text>
          <Text className={`mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Update information for user: {userData.name}
          </Text>
        </View>

        <View className={`rounded-lg ${isDarkMode ? 'bg-white' : 'bg-white'} p-4 shadow-sm`}>
          <Text className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-black' : 'text-gray-900'}`}>
            User Information
          </Text>
          
          <View className="mb-4">
            <CustomInput
              label="Name"
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
              placeholder="Enter name"
            />
          </View>

          <View className="mb-4">
            <CustomInput
              label="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              placeholder="Enter email"
              keyboardType="email-address"
            />
          </View>

          <View className="mb-4">
            <CustomInput
              label="Phone"
              value={formData.phone}
              onChangeText={(text) => setFormData({...formData, phone: text})}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
              <CustomInput
              label="Gender"
              value={formData.gender}
              onChangeText={(text) => setFormData({...formData, gender: text})}
              placeholder="Enter gender"
              keyboardType="phone-pad"
            />  <CustomInput
            label="Address"
            value={formData.address}
            onChangeText={(text) => setFormData({...formData, address: text})}
            placeholder="Enter address"
            keyboardType="phone-pad"
          />
          </View>
          

          <View className="mb-4">
            <CustomInput
              label="Role"
              value={formData.role}
              onChangeText={(text) => setFormData({...formData, role: text})}
              placeholder="Enter role"
            />
          </View>

          <CustomButton onPress={handleUpdateUser} style={{backgroundColor: '#EF8F02'}} >
            Update User Details
          </CustomButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
