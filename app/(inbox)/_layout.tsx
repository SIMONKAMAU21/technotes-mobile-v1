import { Stack } from "expo-router";
import React from "react";
import { screenOptions } from "@/constants/animation";
import { StatusBar } from "expo-status-bar";

export default function InboxLayout() {
  return (
    <>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="index" options={screenOptions} />
        <Stack.Screen name="conversation" options={screenOptions} />
      </Stack>
      <StatusBar style="light" backgroundColor="#4299E1" />
    </>
  );
}
