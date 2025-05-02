// app/(admin)/tabs/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function AdminTabsLayout() {
    
  return (
    <Tabs screenOptions={{ 
      headerShown: false,
      tabBarStyle: { 
        backgroundColor: '#4299E1',
        // borderRadius: 20,
        // marginHorizontal: 20,
        // marginBottom: 1
        
        display: 'flex',
        height:60,
        alignItems: 'center',
      },
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#90CDF4',
      tabBarLabelStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        // backgroundColor: ''
      }
    }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
