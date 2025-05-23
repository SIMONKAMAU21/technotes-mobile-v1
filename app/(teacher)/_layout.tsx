import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
import { screenOptions } from "@/constants/animation";
import { useUserStore } from "@/store";
import LoadingIndicator from "@/components/ui/loading";

export default function TeacherLayout() {
  const { userData, isHydrated } = useUserStore();
  const router = useRouter();
  const redirectedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Only proceed when store is fully hydrated
    if (!isHydrated) return;

    // Prevent multiple redirections
    if (redirectedRef.current) return;
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce the auth check to handle rapid state changes
    timeoutRef.current = setTimeout(() => {
      
      if (!userData || userData?.role !== "teacher") {
        console.log("Redirecting to signIn because user is:", userData);
        redirectedRef.current = true;
        router.replace("/(auth)/signIn");
        return;
     }   }, 300); // Increased delay to handle rapid state changes

    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isHydrated, userData, router]);

  // Show loading until store is hydrated and auth is checked
  if (!isHydrated  && !redirectedRef.current) {
    return <LoadingIndicator />;
  }

  // Don't render anything if we're redirecting
  if (redirectedRef.current) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="tabs" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="light" backgroundColor="#4299E1" />
    </>
  );
}