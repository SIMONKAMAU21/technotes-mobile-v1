import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useRouter, usePathname, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { signOut, useUserData } from "@/utils";

interface SidebarItem {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  path: string;
  roles: ("admin" | "teacher" | "student")[];
  onClick?: () => void;
}

const sidebarItems: SidebarItem[] = [
  // Admin items
  {
    title: "Overview", 
    icon: "home",
    path: "/", // Removed (dashboard)
    roles: ["admin"],
  },
  {
    title: "Users",
    icon: "people", 
    path: "/users", // Removed (dashboard)
    roles: ["admin"],
  },
  {
    title: "Settings",
    icon: "settings",
    path: "/settings", // Removed (dashboard)
    roles: ["admin"],
  },
  // Teacher items
  {
    title: "My Classes",
    icon: "book",
    path: "/teacher/classes", // Removed (dashboard)
    roles: ["teacher"],
  },
  {
    title: "Students",
    icon: "people",
    path: "/teacher/students", // Removed (dashboard)
    roles: ["teacher"],
  },
  {
    title: "Assignments",
    icon: "document-text",
    path: "/teacher/assignments", // Removed (dashboard)
    roles: ["teacher"],
  },
  // Student items
  {
    title: "My Courses",
    icon: "book",
    path: "/student/courses", // Removed (dashboard)
    roles: ["student"],
  },
  {
    title: "Assignments",
    icon: "document-text",
    path: "/student/assignments", // Removed (dashboard)
    roles: ["student"],
  },
  {
    title: "Grades",
    icon: "bar-chart",
    path: "/student/grades", // Removed (dashboard)
    roles: ["student"],
  },
  {
    title: "Logout",
    icon: "log-out",
    path: "/logout",
    roles: ["student", "teacher", "admin"],
    onClick: () => {
      // Call logout function
      signOut();
      router.push("/(auth)/signIn");
    }
  },
];

interface SidebarProps {
  isDarkMode?: boolean;
  isVisible: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isDarkMode = false,
  isVisible,
  onClose,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  console.log("Current pathname:", pathname);
  const { user } = useUserData();

  if (!user) return null;

  const filteredItems = sidebarItems.filter((item) =>
    item.roles.includes(user.role)
  );

  const handleNavigate = (path: string) => {
    onClose();
    router.push(path as any);
  };

  return (
    <>
      {isVisible && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1000,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={onClose}
            className="flex-1 bg-black/50"
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={(e) => e.stopPropagation()}
              className={`w-[50%] h-full ${
                isDarkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <View className="">
                <View className="space-y-2">
                  {filteredItems.map((item) => {
                    const isActive = pathname === item?.path;
                    console.log("Path comparison:", item?.path, pathname, isActive);
                    return (
                      <TouchableOpacity
                        key={item.path}
                        onPress={() => {
                            if (item.onClick) {
                              item.onClick(); // call logout or any custom action
                            } else {
                              handleNavigate(item.path);
                            }
                          }}                        className={`flex-row items-center p-3 rounded-lg ${
                          isDarkMode ? "hover:bg-gray-500" : "hover:bg-gray-200"
                        }`}
                      >
                        <View className={`flex-row ${isActive ? 'bg-[#E9EEF6]' : ''} p-3 rounded-lg w-full items-center`}>
                          <Ionicons
                            name={item.icon}
                            size={24}
                            color={isActive ? "#EF8F02" : (isDarkMode ? "white" : "black")}
                            className="mr-3"
                          />
                          <Text
                            className={`${
                              isActive 
                                ? "text-[#EF8F02]"
                                : (isDarkMode ? "text-[#EF8F02]" : "text-gray-900")
                            } font-bold`}
                          >
                            {item.title}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
