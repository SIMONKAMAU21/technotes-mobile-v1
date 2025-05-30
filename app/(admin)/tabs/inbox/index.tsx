import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useGetInbox } from "./data";
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

const InboxScreen = () => {
  const router = useRouter();
  const state = useAppState();
  const globalError = state.globalError;
  const globalSuccess = state.globalSuccess;
  const { data, isLoading, error } = useGetInbox();

  useEffect(() => {
    socket.on("userConversationsFetched", (populated) => {
      // console.log('populated', populated)
      // console.log("populated", populated);
    });
  }, []);
  
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
    <SafeAreaView className="flex-1 bg-bg mt-10">
      <HeaderWithIcon title="Inbox" />
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
          {data?.map((item: any) => (
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
                        : require("../../../../assets/images/user-placeholder.png")
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
                  {item.lastMessage.content.length > 60 ? item.lastMessage.content.slice(0,60) + "..." : item.lastMessage.content}
                   
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
          onPress={() => router.push("/(admin)/tabs/users/userAdd")}
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
