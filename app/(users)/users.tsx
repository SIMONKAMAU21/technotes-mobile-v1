import React, { useCallback, useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import { Avatar } from "react-native-paper";
import { useAppState } from "@/store/actions";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import { useGetUsers } from "@/shared/data/api";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import SearchInput from "@/components/ui/searchInput";
import LoadingIndicator from "@/components/ui/loading";
import { useUserData } from "@/utils";
import { SwipeListView } from "react-native-swipe-list-view";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import SwipeList from "@/components/ui/gestures/swipeList";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";

export default function UsersScreen() {
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const { data, isLoading, error } = useGetUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUserData();

  const isAdmin = user?.role === "admin"; // Assuming user data has a role field
  const router = useRouter();
const {theme} = useContext(ThemeContext)
const color = Theme[theme]
  const filteredUsers = useMemo(() => {
    if (!data || !searchQuery.trim()) {
      return data || [];
    }
    const query = searchQuery.toLowerCase().trim();
    return data.filter((user: any) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    });
  }, [data, searchQuery]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
  };
  //editing and deleting users
  const handleEdit = (user: any) => {
    router.push({
      pathname: "/(admin)/tabs/users/userdata",
      params: { userdata: JSON.stringify(user) },
    });
  };
  const handleDelete = (user: any) => {
    // router.push({
    //   pathname: "/(admin)/tabs/users/delete",
    //   params: { userdata: JSON.stringify(user) },
    // });
  };
  //start a conversation with a user
  const handleUserPress = (user: any) => {
    // setSelectedUser(user);
    router.push({
      pathname: "/(inbox)/conversation",
      params: { userdata: JSON.stringify(user) },
    });
  };
  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      return (
        <TouchableOpacity
          key={item.id}
          style={{backgroundColor:color.bg}}
          onPress={() => handleUserPress(item)}
          className={`flex-row  items-center p-4 mb-1 rounded-md `}
        >
          <View className="flex-1 flex-row items-center gap-2">
            {item?.photo ? (
              <Avatar.Image size={40} source={{ uri: item?.photo }} />
            ) : (
              <Avatar.Text
                style={{
                  backgroundColor: "#4299E1",
                }}
                size={40}
                label={item?.name.charAt(0)}
                color={isDarkMode ? "white" : "black"}
              />
            )}
            <View className="flex-1">
              <Text
              style={{color:color.text}}
                className={`font-medium text-transform capitalize`}
              >
                {item.name}
              </Text>
              <Text
                className={`text-sm ${
                  isDarkMode ? "text-gray-300" : "text-gray-100"
                }`}
              >
                {item.email}
              </Text>
            </View>
          </View>
          <Text
            className={`${
              item.role === "admin"
                ? "text-blue-600"
                : item.role === "teacher"
                ? "text-yellow-600"
                : item.role === "student"
                ? "text-green-600"
                : item.role === "parent"
                ? "text-red-600"
                : isDarkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            {item.role}
          </Text>
        </TouchableOpacity>
      );
    },
    [data, searchQuery, isDarkMode, router, handleUserPress]
  );

  const renderHiddenItem = useCallback(
    ({ item }: { item: any }) => {
      return (
        <View className=" flex-row justify-between items-center flex-1">
          {/* Left side (swipe right → show “Edit”) */}
          <TouchableOpacity
            onPress={() => handleEdit(item)}
            className="rounded-l-md items-center justify-center w-24 "
          >
            <FontAwesome5 name="user-edit" size={24} color="#EF8F02" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleUserPress(item)}
            className="rounded-l-md items-center justify-center w-24 "
          >
            <MaterialCommunityIcons
              name="chat-plus"
              size={24}
              color="#4299E1"
            />
          </TouchableOpacity>
        </View>
      );
    },
    [handleEdit, isAdmin]
  );
  return (
    <SafeAreaView className="flex-1 border  mt-[7%] " style={{backgroundColor:color.background}}>
      <WPSuccess
        visible={globalSuccess?.visible}
        description={globalSuccess?.description}
      />
      <WPError
        visible={globalError?.visible}
        description={globalError?.description}
      />
      <HeaderWithIcon title="users" />
      <SearchInput
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="search user ..."
        className=""
      />

      <View className={`rounded-l h-[90%]  shadow-sm`}>
        {isLoading ? (
          <LoadingIndicator />
        ) : error ? (
          <Text className={`${isDarkMode ? "text-red-400" : "text-red-600"}`}>
            Error loading users
          </Text>
        ) : (
          <>
            <SwipeList
              data={filteredUsers}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              isAdmin={isAdmin}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
