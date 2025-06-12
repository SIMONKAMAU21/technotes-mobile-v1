import React, { useContext, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
// import { useGetUsers } from '../../data';
import { useRouter } from "expo-router";
import { CustomButton } from "@/components/ui/customButton";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { useAppState } from "@/store/actions";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import { useGetUsers } from "@/shared/data/api";
import Loading from "@/components/ui/toasts/Loading";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import SearchInput from "@/components/ui/searchInput";
import LoadingIndicator from "@/components/ui/loading";
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

  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];
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

  const handleUserPress = (user: any) => {
    // setSelectedUser(user);
    console.log("here", user);
    router.push({
      pathname: "/(inbox)/conversation",
      params: { userdata: JSON.stringify(user) },
    });
  };

  return (
    <SafeAreaView className="flex-1 mt-[7%] " style={{backgroundColor:color.background}}>
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
      <ScrollView
        className={`flex-1 ${isDarkMode ? "bg-bg" : "bg-bg "}`}
        contentContainerClassName="p-2"
        style={{backgroundColor:color.background}}
      >
        <View className={`rounded-l  shadow-sm`}>
          {isLoading ? (
            <LoadingIndicator />
          ) : error ? (
            <Text className={`${isDarkMode ? "text-red-400" : "text-red-600"}`}>
              Error loading users
            </Text>
          ) : (
            <View>
              {filteredUsers?.map((user: any) => (
                <TouchableOpacity
                  key={user.id}
                  style={{backgroundColor:color.bg}}
                  onPress={() => handleUserPress(user)}
                  className={`flex-row items-center p-4 mb-1 rounded-md `}
                >
                  <View className="flex-1 flex-row items-center gap-2">
                    {user?.photo ? (
                      <Avatar.Image size={40} source={{ uri: user?.photo }} />
                    ) : (
                      <Avatar.Text
                        style={{
                          backgroundColor: "#4299E1",
                        }}
                        size={40}
                        label={user?.name.charAt(0)}
                        color={isDarkMode ? "white" : "black"}
                      />
                    )}
                    <View className="flex-1">
                      <Text
                      style={{color:color.text}}
                        className={`font-medium text-transform capitalize`}
                      >
                        {user.name}
                      </Text>
                      <Text
                        className={`text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-100"
                        }`}
                      >
                        {user.email}
                      </Text>
                    </View>
                  </View>
                  <Text
                    className={`${
                      user.role === "admin"
                        ? "text-blue-600"
                        : user.role === "teacher"
                        ? "text-yellow-600"
                        : user.role === "student"
                        ? "text-green-600"
                        : user.role === "parent"
                        ? "text-red-600"
                        : isDarkMode
                        ? "text-gray-300"
                        : "text-gray-600"
                    }`}
                  >
                    {user.role}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* <View className="absolute bottom-6 right-6">
        <CustomButton
          onPress={() => router.push('/(admin)/tabs/users/userAdd')}
          // style={{ borderRadius: 30, width: 60, height: 60 }}
        >
          <View className='flex-row justify-center items-center'>
          <Logo className='w-10 h-10'/>
          <Ionicons name="add" size={24} color="white" />
          </View>
        </CustomButton>
      </View> */}
    </SafeAreaView>
  );
}
