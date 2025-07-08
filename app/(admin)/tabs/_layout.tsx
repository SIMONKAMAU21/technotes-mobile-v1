// app/(admin)/tabs/_layout.tsx
import { Tabs, usePathname } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";

export default function AdminTabsLayout() {
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];
  const pathName = usePathname();
  // console.log('pathName', pathName)
  const hiddenPathNames = [
    "/tabs/users/userdata",
    "/tabs/users/userAdd",
    "/tabs/inbox/conversation",
  ];
  const isHidden = (pathName: string, hiddenPathNames: string[]) =>
    hiddenPathNames.includes(pathName);
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: ((route) => {
          // console.log('route', route)
          if (isHidden(pathName, hiddenPathNames)) {
            return { display: "none" };
          }
          return {
            backgroundColor: color.statusBar,
            display: "flex",
            height: 60,
            alignItems: "center",
            borderWidth:1,
            borderColor:color.statusBar,
            paddingHorizontal:10,
          };
        })(route),
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#90CDF4",
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 12,
        },
      })}
    >
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

      {/* <Tabs.Screen
        name="classes"
        options={{
          title: "Classes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" color={color} size={size} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail" color={color} size={size} />
          ),
        }}
      />
       <Tabs.Screen
        name="Events"
        options={{
          title: "Events",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
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
