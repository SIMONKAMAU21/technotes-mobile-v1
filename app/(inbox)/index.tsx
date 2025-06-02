import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { useRouter } from "expo-router";
import { formatTime } from "@/utils/constants/stringUtils";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import LoadingIndicator from "@/components/ui/loading";
import { Image } from "react-native";
import { useAppState } from "@/store/actions";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import { CustomButton } from "@/components/ui/customButton";
import { useUserStore } from "@/store";
import SearchInput from "@/components/ui/searchInput";
import { useGetInbox } from "./data";
import { connectSocket, socket } from "@/utils/socket";
import { useChatStore } from "@/store/useChatStore";

interface ChatStoreType {
  messages: any[];
  getMessages: (conversationId: string) => void;
  isMessagesLoading: boolean;
  selectedUser: any;
  subscribeToMessages: () => void;
  isSendingMessage: boolean;
  unsubscribeFromMessages: () => void;
  getConversations: (userId: string) => void;
  clearMessages: () => void;
  conversations: any[];
  isconversationsLoading: boolean;
  isError?: any;
}

const InboxScreen = () => {
  const router = useRouter();
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
  const user = useUserStore((state) => state.userData);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    subscribeToMessages,
    unsubscribeFromMessages,
    clearMessages,
    isconversationsLoading: isLoading,
    getConversations,
    conversations: data,
    isError:error
  } = useChatStore() as ChatStoreType;

  useEffect(() => {
    connectSocket();
    // Clear previous messages when switching conversations
    clearMessages();
    // Load messages for this conversation
    getConversations(user?.id);
    // Subscribe to real-time updates
    subscribeToMessages();
    // Cleanup function
    return () => {
      unsubscribeFromMessages();
    };
  }, [
    user?.id,
    getConversations,
    subscribeToMessages,
    unsubscribeFromMessages,
    clearMessages,
  ]);
  const filteredUsers = useMemo(() => {
    if (!data || !searchQuery.trim()) {
      return data || [];
    }
    const query = searchQuery.toLowerCase().trim();
    return data.filter((chat: any) => {
      return (
        chat.lastMessage.receiverId.name?.toLowerCase().includes(query) ||
        chat.lastMessage.content.toLowerCase().includes(query) ||
        chat.lastMessage.senderId.role?.toLowerCase().includes(query)
      );
    });
  }, [data, searchQuery]);

  if (!user) {
    return;
  }

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-bg">
        <LoadingIndicator />
      </SafeAreaView>
    );
  }

  // if (error) {
  //   return (
  //     <SafeAreaView className="flex-1 justify-center items-center bg-bg">
  //       <Text>Error loading inbox: {error.message}</Text>
  //     </SafeAreaView>
  //   );
  // }

  const handleConversation = (item: any) => {
    router.push({
      pathname: "/(inbox)/conversation",
      params: { conversation: JSON.stringify(item) },
    });
  };

  const handleTextChange = (text: string) => {
    setSearchQuery(text);
  };
  return (
    <SafeAreaView className="flex-1 bg-bg mt-[7%]">
      <HeaderWithIcon title="Inbox" />
      <SearchInput
        placeholder=""
        value={searchQuery}
        onChange={handleTextChange}
      />
      <WPSuccess
        visible={globalSuccess?.visible}
        description={globalSuccess?.description}
      />
      <WPError
        visible={globalError?.visible}
        description={globalError?.description}
      />
      <ScrollView className="flex-1 ">
        <View className=" flex-1">
          {/* <Text className="text-lg font-bold mb-2">
            Conversations: {data?.length ?? 0}
          </Text> */}
          {filteredUsers?.map((item: any) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => handleConversation(item)}
              className=" bg-white bg-opacity-50 align-center rounded-lg p-1 mt-1 flex-row"
            >
              <View className="flex-row p-1 flex-1 gap-2 items-center">
                <View className=" border  border-primary rounded-full">
                  <Image
                    source={
                      item?.lastMessage?.receiverId?.photo
                        ? { uri: item?.lastMessage?.receiverId?.photo }
                        : require("../../assets/images/user-placeholder.png")
                    }
                    className="w-10 h-10 rounded-full "
                  />
                </View>

                <View className="  flex-1  pl-2 justify-center">
                  <Text className=" font-semibold text-transform capitalize">
                    {item?.lastMessage?.receiverId?.name}
                  </Text>
                  <View className="flex-row items-center gap-1">
                    {item.lastMessage.read === false ? (
                      <Octicons name="check" size={15} color={"gray"} />
                    ) : (
                      <Octicons name="check" color={"#4299E1"} />
                    )}
                    <Text style={{ textTransform: "lowercase" }}>
                      {item.lastMessage.content.length > 60
                        ? item.lastMessage.content.slice(0, 60) + "..."
                        : item.lastMessage.content}
                    </Text>
                  </View>

                  <Text className="self-end opacity-50 text-sm">
                    {formatTime(item?.lastMessage?.timestamp)}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View className="absolute bottom-6 right-6">
        <CustomButton
          onPress={() => router.push("/(users)/users")}
          // style={{ borderRadius: 30, width: 60, height: 60 }}
        >
          <View className="flex-row justify-center items-center">
            <MaterialCommunityIcons name="chat-plus" size={24} color="white" />
          </View>
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default InboxScreen;
