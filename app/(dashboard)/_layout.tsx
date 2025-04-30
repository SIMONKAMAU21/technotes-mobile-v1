import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
export default function DashboardLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(admin)"
        options={{
          title: 'Admin Dashboard',
        }}
      />
      <Stack.Screen
        name="teacher" 
        options={{
          title: 'Teacher Dashboard',
        }}
      />
      <Stack.Screen
        name="student"
        options={{
          title: 'Student Dashboard', 
        }}
      />
    </Stack>
  );
}
