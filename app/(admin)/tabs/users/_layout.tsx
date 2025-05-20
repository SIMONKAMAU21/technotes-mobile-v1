import { Stack } from "expo-router";
import React from "react";
import { screenOptions } from "@/constants/animation";
export default function UsersLayout() {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" options={screenOptions} />
      <Stack.Screen name="userdata" options={screenOptions} />
      <Stack.Screen name="userAdd" options={screenOptions} />
    </Stack>
  );
}
