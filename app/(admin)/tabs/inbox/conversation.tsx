import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useState } from "react";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { ActivityIndicator, Avatar, Icon, MD2Colors } from "react-native-paper";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetConversation, useSendMessage } from "./data";
import { useUserData } from "@/utils";
import CustomInput from "@/components/ui/customInput";
import { CustomButton } from "@/components/ui/customButton";
import { Ionicons } from "@expo/vector-icons";
import { formatTime } from "@/utils/constants/stringUtils";
import LoadingIndicator from "@/components/ui/loading";

const ConversationScreen = () => {
  const params = useLocalSearchParams();
  const { user } = useUserData();
  const [content, setContent] = useState("");
  const conversation = JSON.parse(params.conversation as string);
  const conversationId = conversation?.lastMessage?.conversationId;
  const { data, isLoading, error } = useGetConversation(conversationId);
  const userId = user?.id;

  const getReceiverIdFromConversation = (
    conversationId: string,
    loggedInUserId: string
  ) => {
    const ids = conversationId?.split("_");
    return ids?.find((id) => id !== loggedInUserId);
  };
  const receiverId = getReceiverIdFromConversation(conversationId, userId);
  const { mutate: sendMessage, isLoading: sending, isError } = useSendMessage();
  const handleSend = async () => {
    const payload = {
      receiverId,
      senderId: userId,
      content,
    };
    console.log("payload", payload);
    try {
      if (payload) {
        const response = await sendMessage(payload);
        setContent("");
        // console.log('response', response)
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-bg mt-10">
      <HeaderWithIcon title="Conversation" />
      <ScrollView className="flex-1 bg-bg px-4 mt-2">
        {isLoading && (
          <LoadingIndicator/>
        )}
        {data?.map((message: any) => {
          const isSender = message?.senderId._id === userId;
          return (
            <View
              key={message._id}
              className={`p-2  w-auto mt-2 rounded-lg  shadow max-w-[95%] ${
                isSender ? "self-start bg-primary" : "self-end bg-red-100 "
              }`}
            >
              {/* <Avatar.Image source={}/> */}
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
                  } text-xs self-end `}
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
          style={{ width: "80%", height: 40, borderRadius: "30%" }}
          placeholder="Type a message..."
          onChangeText={setContent}
          value={content}
        />
        <CustomButton onPress={handleSend} style={{ width: "15%", height: 40 }}>
          {sending ? (
            <Text>sending..</Text>
          ) : (
            <Ionicons name="send" size={24} color="white" />
          )}
        </CustomButton>
      </View>
    </SafeAreaView>
  );
};

export default ConversationScreen;
