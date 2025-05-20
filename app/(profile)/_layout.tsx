import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { screenOptions } from "@/constants/animation";

export default function ProfileLayout() {
  return (
    <>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="profile" options={{ headerShown: false }} />

      </Stack>
      <StatusBar style="light" backgroundColor="#4299E1" />
    </>
  );
}
