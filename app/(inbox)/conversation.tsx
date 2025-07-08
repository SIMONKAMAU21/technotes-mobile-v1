import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from "react-native";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import { useLocalSearchParams } from "expo-router";
import { useUserData } from "@/utils";
import CustomInput from "@/components/ui/customInput";
import { formatTime } from "@/utils/constants/stringUtils";
import WPSuccess from "@/components/ui/success/WPSuccess";
import WPError from "@/components/ui/error/WPError";
import Loading from "@/components/ui/toasts/Loading";
import { useChatStore } from "@/store/useChatStore";
import { IconButton } from "react-native-paper";
import { InboxHeaderWithIcon } from "@/components/ui/inboxHeader";
import { connectSocket } from "@/utils/socket";
import { useAppActions, useAppState } from "@/store/actions";
import { ThemeContext } from "@/store/themeContext";
import { Theme } from "@/constants/theme";

interface PayloadType {
  receiverId: string;
  senderId: string;
  content: string;
}
interface ChatStoreType {
  messages: any[];
  getMessages: (conversationId: string) => void;
  isMessagesLoading: boolean;
  selectedUser: any;
  subscribeToMessages: () => void;
  isSendingMessage: boolean;
  unsubscribeFromMessages: () => void;
  sendMessage: (
    payload: PayloadType,
    actions: { setGlobalError: any; setGlobalSuccess: any }
  ) => Promise<void>;
  clearMessages: () => void;
}

const ConversationScreen = () => {
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
  const { setGlobalError, setGlobalSuccess } = useAppActions();
  const params = useLocalSearchParams();
  const { user } = useUserData();
  const [content, setContent] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const { theme } = useContext(ThemeContext);
  const color = Theme[theme];
  const userId = user?.id;

  // Safe JSON parsing with error handling
  let conversation = null;
  let userData = null;

  try {
    if (params.conversation && typeof params.conversation === "string") {
      conversation = JSON.parse(params.conversation);
    }
  } catch (error) {
    console.error("Error parsing conversation:", error);
  }

  try {
    if (params.userdata && typeof params.userdata === "string") {
      userData = JSON.parse(params.userdata);
    }
  } catch (error) {
    console.error("Error parsing userdata:", error);
  }
  let conversationId = null;
  // If conversation is not parsed correctly, fallback to params.conversationId

  if (!conversation || !conversation._id) {
    conversationId = user?.id.toString() + "_" + userData._id?.toString();
  } else {
    conversationId = conversation?.lastMessage?.conversationId;
  }

  let title;
  let receiverPhoto;
  if (
    conversation?.lastMessage?.receiverId?._id === userId ||
    userData?._id !== userId ||
    conversation?.lastMessage?.senderId._id === userId
  ) {
    title =
      conversation?.lastMessage?.senderId?.name ||
      userData?.name ||
      conversation?.lastMessage?.receiverId?.name;
    receiverPhoto =
      conversation?.lastMessage?.senderId?.photo ||
      userData?.photo ||
      conversation?.lastMessage?.receiverId?.photo;
  }

  const {
    messages,
    getMessages,
    isMessagesLoading,
    subscribeToMessages,
    isSendingMessage,
    unsubscribeFromMessages,
    sendMessage,
    clearMessages,
  } = useChatStore() as ChatStoreType;

  const getReceiverIdFromConversation = useCallback(
    (conversationId: string, loggedInUserId: string) => {
      const ids = conversationId?.split("_");
      return ids?.find((id) => id !== loggedInUserId);
    },
    []
  );

  const receiverId =
    getReceiverIdFromConversation(conversationId, userId) || userData?._id;
  // Load messages and subscribe to updates
  useEffect(() => {
    connectSocket();

    // Clear previous messages when switching conversations
    clearMessages();

    // Load messages for this conversation
    getMessages(conversationId);

    // Subscribe to real-time updates
    subscribeToMessages();

    // Cleanup function
    return () => {
      unsubscribeFromMessages();
    };
  }, [
    conversationId,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
    clearMessages,
  ]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = async () => {
    if (!content.trim() || !userId || !receiverId || isSendingMessage) {
      return;
    }

    const payload: PayloadType = {
      receiverId: receiverId as string,
      senderId: userId as string,
      content: content.trim(),
    };

    try {
      await sendMessage(payload, { setGlobalError, setGlobalSuccess });
      setContent("");

      // Scroll to bottom after sending
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error("Error sending message:", error);
      // Error handling is done in the store
    }
  };

  const handleContentChange = (text: string) => {
    setContent(text);
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg1.jpg")}
      className="flex-1 opacity-2"
      resizeMode="cover"
    >
      <View style={{ flex: 1, 
        
        backgroundColor:theme === "dark" ? "rgba(0, 0, 0, 0.5)" : 'rgba(39, 38, 38, 0.5)' }}>
        <SafeAreaView
          className="flex-1 mt-[7%]"
          // style={{ backgroundColor: color.background,opacity:0.5 }}
          style={{ backgroundColor: "transparent" }}
        >
          <WPSuccess
            visible={globalSuccess?.visible}
            description={globalSuccess?.description}
          />
          <WPError
            visible={globalError?.visible}
            description={globalError?.description}
          />
          {/* <HeaderWithIcon title="Conversation" /> */}
          <InboxHeaderWithIcon title={title} url={receiverPhoto} />
          <KeyboardAvoidingView
            className="flex-1 text-black"
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
          >
            <ScrollView
              className="flex-1 px-[2%] py-2"
              ref={scrollViewRef}
              keyboardShouldPersistTaps="handled"
              // style={{ backgroundColor: color.background }}
              style={{ backgroundColor: "transparent" }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
            >
              {isMessagesLoading && <Loading />}

              {messages?.map((message) => {
                const isSender =
                  message?.senderId?._id === userId ||
                  message?.senderId === userId;

                return (
                  <View
                    key={message._id || message.id}
                    className={`p-2 w-auto mt-2 rounded-lg shadow max-w-[95%] ${
                      isSender ? "self-end bg-primary" : "self-start bg-orange-100"
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
                        {formatTime(message?.timestamp || message?.createdAt)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            <View
              style={{ backgroundColor: color.bg }}
              className="px-[2%]  flex flex-row   items-center bg-bg self-center  rounded-3xl  w-[100%] mb-[1%] justify-between"
            >
              <CustomInput
                style={{
                  // height: "70%",
                  width: "80%",
                  color: color.text,
                  padding: 10,
                  backgroundColor: color.bg,
                }}
                placeholder="Message"
                multiline={true}
                onChangeText={handleContentChange}
                value={content}
              />
              {/* <IconButton
            icon={"camera"}
            onPress={() => setContent("")}
            iconColor="black"
            size={20}
            className="bg-bg rounded-full"
          /> */}
              {isSendingMessage ? (
                <Loading />
              ) : (
                <View className="flex-row items-center justify-center">
                  <IconButton
                    icon={"send"}
                    onPress={handleSend}
                    iconColor="white"
                    size={20}
                    className="bg-primary rounded-lg"
                    disabled={!content.trim() || isSendingMessage}
                  />
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
};

export default ConversationScreen;
