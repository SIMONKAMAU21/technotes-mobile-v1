import React, { useCallback, useContext, useEffect, useState } from "react";
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
import MyLineChart, { shadow } from "@/components/ui/shadow";
import {
  LineChart,
  BarChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { HStack, VStack } from "@/components/ui/Stacks";
interface userData {
  // user:[]
  role: string;
}
const bibleVerses = [
  "I can do all things through Christ. - Phil 4:13",
  "For God so loved the world... - John 3:16",
  "The Lord is my shepherd. - Psalm 23:1",
  "Trust in the Lord with all your heart. - Prov 3:5",
];
export default function DashboardScreen() {
  const { data: users = [] } = useGetUsers();
  const user = useUserStore((state: any) => state.userData);
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];
  const [verseIndex, setVerseIndex] = useState(0);
  // useEffect(() => {
  //   console.log("DashboardScreen mounted");
  //   return () => console.log("DashboardScreen unmounted");
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVerseIndex((prev) => (prev + 1) % bibleVerses.length);
    }, 5000); // change every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const checkAuth = async () => {
        if (isActive && !user) {
          router.replace("/(auth)/signIn");
        }
      };

      checkAuth();

      return () => {
        isActive = false; // prevents async code from setting state after unmount
      };
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
      <HeaderDashboard userName={user?.name} userImage={user?.photo} />
      <ScrollView
        // className={`bg-${color.background}`}
        contentContainerClassName="p-2"
      >
        <View
          style={{
            height: 210,
            width: "100%",
            borderRadius: 16,
            overflow: "hidden",
            marginBottom: 16,
            position: "relative",
          }}
        >
          {/* Background image */}
          <Image
            source={{ uri: user?.photo }}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            resizeMode="cover"
          />

          {/* Overlay */}
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(56, 53, 15, 0.4)",
              padding: 10,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 12,
              }}
            >
              User Statistics
            </Text>

            {/* Card grid */}
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <Card
                color="white"
                icon="people"
                count={adminCount}
                // bgColor="bg-primary"
                label="Admins"
              />
              <Card
                color="white"
                icon="book"
                count={studentCount}
                // bgColor="bg-secondary"
                label="Students"
              />
              <Card
                color="white"
                icon="school"
                count={teacherCount}
                // bgColor="bg-secondary"
                label="Teachers"
              />
              <Card
                color="white"
                icon="person"
                count={parentCount}
                // bgColor="bg-primary"
                label="Parents"
              />
            </View>
          </View>
        </View>
        <VStack
          style={{ backgroundColor: color.bg }}
          className="p-2 rounded-lg mb-4"
        >
          <Text style={{ color: color.text }} className="font-bold">
            System Analysis
          </Text>
          <MyLineChart
            adminCount={adminCount}
            parentCount={parentCount}
            studentCount={studentCount}
            teacherCount={teacherCount}
          />
          <HStack className="justify-between items-center p-2 mb-4">
            <Text className="font-bold" style={{ color: color.text }}>
              A = Admin (s)
            </Text>
            <Text className="font-bold" style={{ color: color.text }}>
              S = Student (s)
            </Text>
            <Text className="font-bold" style={{ color: color.text }}>
              T = Teacher (s)
            </Text>
            <Text className="font-bold" style={{ color: color.text }}>
              P = Parent (s)
            </Text>
          </HStack>
        </VStack>

        <View
          style={{
            ...shadow,
            overflow: "hidden",
            backgroundColor: color.bg,
            position: "relative",
          }}
          className="mb-4 h-20 w-full rounded-lg"
        >
          <Image
            source={{ uri: user?.photo }}
            // resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
            className="rounded-t-lg"
          />

          {/* Semi-transparent black overlay without gradient */}
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(56, 53, 15, 0.4)",
              justifyContent: "center",
              alignItems: "center",
              padding: 16,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 18 }}>Word of today,</Text>
            <Text
              className=""
              style={{
                color: "#fff",
                fontSize: 24,
                fontWeight: "bold",
                fontFamily: "italic",
              }}
            >
              {bibleVerses[verseIndex]}
            </Text>
          </View>
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
              .slice(0, 5)
              .map(
                (
                  user: { name: string; role: string; photo: string },
                  index: number
                ) => (
                  <TouchableOpacity
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
                  </TouchableOpacity>
                )
              )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
