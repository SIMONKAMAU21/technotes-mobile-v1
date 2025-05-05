import { Stack } from "expo-router";
import React from "react";
import { screenOptions } from "@/constants/animation";

export default function ClassesLayout() {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
