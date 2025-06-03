import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { useRouter } from "expo-router";
import { formatTime } from "@/utils/constants/stringUtils";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import LoadingIndicator from "@/components/ui/loading";
import { socket } from "@/utils/socket";
import { Image } from "react-native";
import { useAppState } from "@/store/actions";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import { CustomButton } from "@/components/ui/customButton";
import InboxScreen from "@/app/(inbox)/inbox";
import { useGetInbox } from "@/app/(inbox)/data";

const AdminInbox = () => {
  const router = useRouter();
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
  const { data, isLoading, error } = useGetInbox();

  // useEffect(() => {
  //   socket.on("userConversationsFetched", (populated) => {
  //     // console.log('populated', populated)
  //     // console.log("populated", populated);
  //   });
  // }, []);
  
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-bg">
        <LoadingIndicator />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-bg">
        <Text>Error loading inbox: {error.message}</Text>
      </SafeAreaView>
    );
  }

  const handleConversation = (item: any) => {
    router.push({
      pathname: "/(admin)/tabs/inbox/conversation",
      params: { conversation: JSON.stringify(item) },
    });
  };
  return (
     
    <View className="flex-1 bg-bg">
      <InboxScreen/>
      </View>
  );
};

export default AdminInbox;
