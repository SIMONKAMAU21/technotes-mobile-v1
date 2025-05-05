// app/(admin)/tabs/_layout.tsx
import { Tabs, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export default function AdminTabsLayout() {
  const pathName = usePathname();
// console.log('pathName', pathName)
    const hiddenPathNames = [
      '/tabs/users/[userdata]',
      '/tabs/users/userAdd',

    ]
    const isHidden = (pathName: string,hiddenPathNames: string[]) => hiddenPathNames.includes(pathName);
  return (
    <Tabs 
    // screenOptions={{ 
    //   headerShown: false,
    //   tabBarStyle: { 
    //     backgroundColor: '#4299E1',
    //     display: 'flex',
    //     height:60,
    //     alignItems: 'center',
    //   },
    //   tabBarActiveTintColor: 'white',
    //   tabBarInactiveTintColor: '#90CDF4',
    //   tabBarLabelStyle: {
    //     fontWeight: 'bold',
    //     fontSize: 12,
    //     // backgroundColor: ''
    //   }
    // }}
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: ((route)=>{
        // console.log('route', route)
        if(isHidden(pathName, hiddenPathNames)){
          return { display: 'none' }
        }
        return {
          backgroundColor: '#4299E1',
          display: 'flex',
          height:60,
          alignItems: 'center',
        }
      })(route),
      tabBarActiveTintColor: 'white',
      tabBarInactiveTintColor: '#90CDF4',
      tabBarLabelStyle: {
        fontWeight: 'bold',
        fontSize: 12,
      }
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
     
      <Tabs.Screen
        name="classes"
        options={{
          title: "Classes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="school" color={color} size={size} />
          ),
        }}
      />
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
