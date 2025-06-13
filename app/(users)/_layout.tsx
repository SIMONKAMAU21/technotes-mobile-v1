import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { screenOptions } from "@/constants/animation";


export default function UsersLayout() {


  return (
    <>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="users" options={{ headerShown: false }} />
      </Stack>
      {/* <StatusBar style="light" backgroundColor="#4299E1" /> */}
    </>
  );
}