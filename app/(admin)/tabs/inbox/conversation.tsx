import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetConversation, useSendMessage } from "./data";
import { useUserData } from "@/utils";
import CustomInput from "@/components/ui/customInput";
import { CustomButton } from "@/components/ui/customButton";
import { Ionicons } from "@expo/vector-icons";
import { formatTime } from "@/utils/constants/stringUtils";
import { socket } from "@/utils/socket";
import { useAppActions, useAppState } from "@/store/actions";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import Loading from "@/components/ui/toasts/Loading";

const ConversationScreen = () => {
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
  const params = useLocalSearchParams();
  const { user } = useUserData();
  const [content, setContent] = useState("");
  const conversation = JSON.parse(params.conversation as string);
  const conversationId = conversation?.lastMessage?.conversationId;
  const { data, isLoading, error } = useGetConversation(conversationId);
  const [newMessages, setNewMessages] = useState<any[]>([]);
  const userId = user?.id;
  const scrollViewRef = useRef<ScrollView>(null);

  const getReceiverIdFromConversation = (
    conversationId: string,
    loggedInUserId: string
  ) => {
    const ids = conversationId?.split("_");
    return ids?.find((id) => id !== loggedInUserId);
  };
  useEffect(() => {
    if (newMessages.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  }, [newMessages]);
  const receiverId = getReceiverIdFromConversation(conversationId, userId);
  const { mutate: sendMessage, isLoading: sending, isError } = useSendMessage();

  // Combine existing messages with new messages
  const allMessages = React.useMemo(() => {
    const existingMessages = data || [];
    const combinedMessages = [...existingMessages, ...newMessages];

    // Sort by timestamp to maintain chronological order
    return combinedMessages.sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }, [data, newMessages]);

  useEffect(() => {
    if (conversationId) {
      console.log("first", conversationId);
      // Join the conversation room
      socket.emit("joinConversation", conversationId);

      socket.on("messageAdded", (message) => {
        console.log("message", message);
        setNewMessages((prevMessages) => {
          // Check if message already exists to avoid duplicates
          const messageExists = prevMessages.some(
            (msg) => msg._id === message._id
          );
          if (!messageExists) {
            return [...prevMessages, message];
          }
          return prevMessages;
        });
      });

      return () => {
        // Leave room when component unmounts or conversationId changes
        socket.emit("leaveConversation", conversationId);
        socket.off("messageAdded");
      };
    }
  }, [conversationId]);
  //scrolling to latest message

  const handleSend = async () => {
    const payload = {
      receiverId,
      senderId: userId,
      content,
    };
    if (!content || !userId || !receiverId) {
      return;
    }
    try {
      if (payload) {
        const response = await sendMessage(payload);
        setContent("");
        // Note: The new message will be added via socket, so no need to manually add it here
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-bg mt-10">
      <WPSuccess
        visible={globalSuccess?.visible}
        description={globalSuccess?.description}
      />
      <WPError
        visible={globalError?.visible}
        description={globalError?.description}
      />
      <HeaderWithIcon title="Conversation" />
      <KeyboardAvoidingView
        className="flex-1 text-black"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={100} // adjust if needed
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          className="flex-1 bg-bg px-4 mt-2"
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
        >
          {isLoading && <Loading />}
          {allMessages?.map((message: any) => {
            const isSender = message?.senderId._id === userId;
            return (
              <View
                key={message._id}
                className={`p-2 w-auto mt-2 rounded-lg shadow max-w-[95%] ${
                  isSender ? "self-start bg-primary" : "self-end bg-red-100"
                }`}
              >
                <View>
                  <Text
                    className={`text-md ${
                      isSender ? "text-white" : "text-black"
                    } flex`}
                  >
                    {message.content}
                  </Text>
                  <Text
                    className={`${
                      isSender ? "text-white/50" : "text-gray-500"
                    } text-xs self-end`}
                  >
                    {formatTime(message?.timestamp)}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View className="pl-2 pr-2 flex flex-row items-center justify-between">
          <CustomInput
            style={{
              minHeight: 40,
              maxHeight: 40,
              width: "80%",
              borderRadius: 20,
              padding: 2,
              paddingTop: 2,
              textOverflow: "hidden",

              // paddingHorizontal: 10,
              paddingVertical: 0,
            }}
            placeholder="Message...."
            multiline={true}
            onChangeText={setContent}
            value={content}
          />
          <CustomButton
            onPress={handleSend}
            disabled={!content}
            style={{ width: "15%", height: 40 }}
          >
            {sending ? (
              <>
                <Loading />
                <Text className="text-white font-bold text-lg">...</Text>{" "}
              </>
            ) : (
              <Ionicons name="send" size={24} color="white" />
            )}
          </CustomButton>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ConversationScreen;
