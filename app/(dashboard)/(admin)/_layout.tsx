import { Stack } from 'expo-router';
import { useUserData } from '@/utils';
import { Redirect } from 'expo-router';
import React from 'react';
export default function AdminLayout() {
  const { user, isLoading } = useUserData();
  if (isLoading)  return  null;
  // Redirect non-admin users
  if (!user || user.role !== 'admin') {
    return <Redirect href="/" />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="users"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="settings" 
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
