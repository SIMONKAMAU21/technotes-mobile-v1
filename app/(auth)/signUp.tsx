import React from 'react';
import { useState } from 'react';
import { TextInput, View, Text } from 'react-native';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text className="text-3xl font-bold">Sign Up</Text>
      <Text className="mt-5 mb-10">Create an account to get started.</Text>
      
      <View className="w-full max-w-[400px]">
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-4 mb-4 text-base"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          className="h-[50px] border border-gray-300 rounded-lg px-4 mb-4 text-base"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

export default SignUp;