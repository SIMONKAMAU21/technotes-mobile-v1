import { Stack, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { screenOptions } from "@/constants/animation";
import { StatusBar } from "expo-status-bar";
import LoadingIndicator from "@/components/ui/loading";
import { useUserStore } from "@/store";

export default function InboxLayout() {
    const { userData, isHydrated } = useUserStore();
    const router = useRouter();
    const redirectedRef = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
    useEffect(() => {
      // Only proceed when store is fully hydrated
      if (!isHydrated) return;
  
      // Prevent multiple redirections
      if (redirectedRef.current) return;
  
      // console.log('userData in AdminLayout:', userData);
  
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
  
      // Debounce the auth check to handle rapid state changes
      timeoutRef.current = setTimeout(() => {
        if (!userData ) {
          // console.log("Redirecting to signIn because user is:", userData);
          redirectedRef.current = true;
          router.replace("/(auth)/signIn");
          return;
        }
      }, 3000); // Increased delay to handle rapid state changes
  
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
        <Stack.Screen name="inbox" options={screenOptions} />
        <Stack.Screen name="conversation" options={screenOptions} />
      </Stack>
      {/* <StatusBar style="light" backgroundColor="#4299E1" /> */}
    </>
  );
}
