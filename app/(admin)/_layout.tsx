import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function AdminLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" backgroundColor="#4299E1" />
    </>
  );
}
