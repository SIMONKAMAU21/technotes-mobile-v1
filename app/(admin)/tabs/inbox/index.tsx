import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { useGetInbox } from "./data";
import { HeaderWithIcon } from "@/components/ui/headerWithIcon";
import { Avatar, Icon } from "react-native-paper";
import { useRouter } from "expo-router";
import { formatTime } from "@/utils/constants/stringUtils";
import { Ionicons, Octicons } from "@expo/vector-icons";
import LoadingIndicator from "@/components/ui/loading";
import { Onlinee } from "@/utils/socket";

const InboxScreen = () => {
  const router = useRouter();


  const { data, isLoading, error } = useGetInbox();
console.log('data', data)
  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-bg">
       <LoadingIndicator/>
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
      <ScrollView className="flex-1 ">
        <View className=" flex-1">
          {/* <Text className="text-lg font-bold mb-2">
            Conversations: {data?.length ?? 0}
          </Text> */}
          {data?.map((item: any) => (
            <TouchableOpacity
              key={item._id}
              onPress={() => handleConversation(item)}
              className=" bg-white bg-opacity-50 rounded-lg p-2 mt-1 flex-row"
            >
              {item?.lastMessage.senderId.photo ? <Avatar.Image source={item?.lastMessage.senderId.photo} size={40}/> :  <Avatar.Text
                style={{
                  backgroundColor: "#4299E1",
                }}
                size={40}
                label={item?.lastMessage?.senderId?.name.charAt(0)}
                className="font-bold bg-red-500"
                // color={isDarkMode ? 'white' : 'black'}
                color="white"
                
              />
              }
             
              <View
                className="p-1 rounded-lg  flex-1 "
              >
                <Text className="font-bold">{item?.lastMessage?.senderId?.name}</Text>
               <View className="flex-1 flex-row items-center ">
               {item.lastMessage.read === false ? <Octicons name="check" size={15}  color={"gray"} /> : <Octicons name="check" color={"#4299E1"}/>}
               <Text className=""> {item.lastMessage.content}</Text>
               </View>

                <Text className="self-end opcity-50 text-sm"> {formatTime(item?.lastMessage?.timestamp)}</Text>

              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InboxScreen;
