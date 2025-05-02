import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUserData } from "@/utils";

interface TabItem {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  path: string;
  roles: ("admin" | "teacher" | "student")[];
}

const tabItems: TabItem[] = [
  // Admin items
  {
    title: "Overview",
    icon: "home",
    path: "/",
    roles: ["admin"],
  },
  {
    title: "Users",
    icon: "people", 
    path: "/users",
    roles: ["admin"],
  },
  {
    title: "Settings",
    icon: "settings",
    path: "/settings",
    roles: ["admin"],
  },
  // Teacher items
  {
    title: "Classes",
    icon: "book",
    path: "/teacher/classes",
    roles: ["teacher"],
  },
  {
    title: "Students", 
    icon: "people",
    path: "/teacher/students",
    roles: ["teacher"],
  },
  {
    title: "Assignments",
    icon: "document-text",
    path: "/teacher/assignments",
    roles: ["teacher"],
  },
  // Student items
  {
    title: "Courses",
    icon: "book",
    path: "/student/courses",
    roles: ["student"],
  },
  {
    title: "Assignments",
    icon: "document-text", 
    path: "/student/assignments",
    roles: ["student"],
  },
  {
    title: "Grades",
    icon: "bar-chart",
    path: "/student/grades",
    roles: ["student"],
  },
];

interface TabBarProps {
  isDarkMode?: boolean;
}

export const TabBar: React.FC<TabBarProps> = ({
  isDarkMode = false,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useUserData();

  if (!user) return null;

  const filteredTabs = tabItems.filter((item) =>
    item.roles.includes(user.role)
  );

  return (
    <ScrollView 
      horizontal
      showsHorizontalScrollIndicator={false}
      className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-2`}
    >
      {filteredTabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <TouchableOpacity
            key={tab.path}
            onPress={() => router.push(tab.path as any)}
            className={`px-4 py-2 mx-1 rounded-full flex-row items-center ${
              isActive ? 'bg-[#E9EEF6]' : ''
            }`}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={isActive ? '#EF8F02' : isDarkMode ? 'white' : 'black'}
              className="mr-1"
            />
            <Text
              className={`${
                isActive
                  ? 'text-[#EF8F02]'
                  : isDarkMode
                  ? 'text-white'
                  : 'text-gray-900'
              } font-medium`}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};
