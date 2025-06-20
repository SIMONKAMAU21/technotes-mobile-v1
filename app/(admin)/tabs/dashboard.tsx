import React, { useCallback, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import HeaderDashboard from "@/components/ui/headerDashbord";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "@/components/ui/card";
import { useUserStore } from "@/store";
import { useFocusEffect } from "@react-navigation/native";
import { useGetUsers } from "@/shared/data/api";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";

interface userData {
  // user:[]
  role: string;
}
export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const { data: users = [] } = useGetUsers();
  const user = useUserStore((state) => state.userData);
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        router.replace("/(auth)/signIn");
      }
    }, [user])
  );

  // useFocusEffect (()=>{
  //    refreshUserData()
  // },[refreshUserData])
  // Calculate user role counts
  const adminCount = users.filter(
    (user: userData) => user.role === "admin"
  ).length;
  const studentCount = users.filter(
    (user: userData) => user.role === "student"
  ).length;
  const teacherCount = users.filter(
    (user: userData) => user.role === "teacher"
  ).length;
  const parentCount = users.filter(
    (user: userData) => user.role === "parent"
  ).length;
  return (
    <SafeAreaView
      className="flex-1 mt-[7%]"
      style={{ backgroundColor: color.background }}
    >
      <HeaderDashboard
        userName={user?.name}
        userImage={user?.photo}
        onMenuPress={() => {}}
      />
      <ScrollView
        className={`bg-${color.background}`}
        contentContainerClassName="p-2"
      >
        {/* <View className="mb-6">
          <Text
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Dashboard
          </Text>
          <Text
            className={`mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Welcome to your admin dashboard
          </Text>
        </View> */}

        <View
          style={{ backgroundColor: color.bg }}
          className={` p-4 shadow-sm mb-4 rounded-lg`}
        >
          <Text
            style={{ color: color.text }}
            className={`text-lg font-semibold`}
          >
            User Statistics
          </Text>

          <View className="flex-row w-full flex-wrap overflow-hidden gap-4 justify-between mt-4">
            <Card
              color="white"
              icon="people"
              count={adminCount}
              bgColor="bg-primary"
              label="Admins"
            />
            <Card
              color="white"
              icon="book"
              count={studentCount}
              bgColor="bg-secondary"
              label="Students"
            />
            <Card
              color="white"
              icon="school"
              count={teacherCount}
              bgColor="bg-secondary"
              label="Teachers"
            />
            <Card
              color="white"
              icon="person"
              count={parentCount}
              bgColor="bg-primary"
              label="Parents"
            />
          </View>
        </View>

        <View
          style={{ backgroundColor: color.bg }}
          className={`rounded-lg p-4 shadow-sm mb-4 `}
        >
          <Text
            style={{ color: color.text }}
            className={`text-lg font-semibold mb-4`}
          >
            System Overview
          </Text>

          <View className="space-y-4 flex-row justify-between">
            <View className="bg-blue-100 p-4 rounded-lg">
              <Text className="text-blue-800 font-semibold">Active Users</Text>
              <Text className="text-blue-600 text-2xl font-bold mt-1">
                {users.length}
              </Text>
            </View>

            <View className="bg-green-100 p-4 rounded-lg">
              <Text className="text-green-800 font-semibold">Admin Users</Text>
              <Text className="text-green-600 text-2xl font-bold mt-1">
                {users.filter((user: userData) => user.role === "admin").length}
              </Text>
            </View>

            <View className="bg-purple-100 p-4 rounded-lg">
              <Text className="text-purple-800 font-semibold">
                Regular Users
              </Text>
              <Text className="text-purple-600 text-2xl font-bold mt-1">
                {
                  users.filter(
                    (user: userData) =>
                      user.role === "student" ||
                      user.role === "teacher" ||
                      user.role === "parent"
                  ).length
                }
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{ backgroundColor: color.bg }}
          className={`rounded-lg  p-4 shadow-sm mb-4`}
        >
          <Text
            style={{ color: color.text }}
            className={`text-lg font-semibold mb-4 `}
          >
            Quick Links
          </Text>

          <TouchableOpacity
            onPress={() => router.push("/(admin)/tabs/users")}
            className="flex-row items-center p-3 bg-primary rounded-lg mb-2"
          >
            <Ionicons name="people" size={24} color="white" />
            <Text className="text-white ml-2">Manage Users</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(admin)/tabs/users/userAdd")}
            className="flex-row items-center p-3 bg-secondary rounded-lg"
          >
            <Ionicons name="person-add" size={24} color="white" />
            <Text className="text-white ml-2">Add New User</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between">
          <View
            className=" p-4 rounded-lg w-full"
            style={{ backgroundColor: color.bg }}
          >
            <Text className=" font-bold mb-2" style={{ color: color.text }}>
              Recent Users
            </Text>
            {users
              .slice(0, 10)
              .map(
                (
                  user: { name: string; role: string; photo: string },
                  index: number
                ) => (
                  <View
                    key={index}
                    className="flex-row items-center justify-between py-2 border-b border-gray-200"
                  >
                    <View className="flex-row items-center gap-2">
                      {user?.photo ? (
                        <Image
                          source={{ uri: user?.photo }}
                          alt="user"
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <Image
                          source={require("../../../assets/images/user-placeholder.png")}
                          alt="user"
                          className="w-10 h-10 rounded-full"
                        />

                        // <Ionicons name="person-circle-outline" size={40} color="gray" />
                      )}
                      <Text
                        className="text-black text-trasnform capitalize"
                        style={{ color: color.text }}
                      >
                        {user.name}
                      </Text>
                    </View>
                    <Text
                      className="text-black/70"
                      style={{ color: color.text }}
                    >
                      {user.role}
                    </Text>
                  </View>
                )
              )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
