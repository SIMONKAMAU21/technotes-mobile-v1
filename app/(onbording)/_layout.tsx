import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { screenOptions } from "@/constants/animation";

export default function OnboardingLayout() {
  return (
    <>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="light" backgroundColor="#4299E1" />
    </>
  );
}
