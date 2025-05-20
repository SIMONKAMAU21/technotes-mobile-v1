import React from "react";
import { Stack } from "expo-router";
import { screenOptions } from "@/constants/animation";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  return (
    <>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="signIn" options={screenOptions} />
        <Stack.Screen
          name="signUp"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="light" backgroundColor="#4299E1" />
    </>
  );
}
