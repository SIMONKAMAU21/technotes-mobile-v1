import { View, Text, SafeAreaView, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import React from 'react';
import { useGetInbox } from './data';
import { HeaderWithIcon } from '@/components/ui/headerWithIcon';
import { Icon } from 'react-native-paper';
import { useRouter } from 'expo-router';

const InboxScreen = () => {
  const router = useRouter()

  const { data, isLoading, error } = useGetInbox();

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-bg">
        <ActivityIndicator size="large" color="#4" />
        <Text>Loading inbox...</Text>
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
    console.log('item', item)
    router.push({
      pathname: '/(admin)/tabs/inbox/conversation',
      params: { conversation: JSON.stringify(item) }
    })
  }
  return (
    <SafeAreaView className="flex-1 bg-bg mt-10">
      <HeaderWithIcon
        title="Inbox"
      />
      <ScrollView className="flex-1 bg-bg px-4">
        <View>
          <Text className="text-lg font-bold mb-2">
            Conversations: {data?.length ?? 0}
          </Text>
          {data?.map((item: any, index: number) => (
            <TouchableOpacity key={index} onPress={() => handleConversation(item)} className="p-2 bg-white rounded-lg mb-2 shadow">
               <View key={item._id} className="p-2 bg-white rounded-lg mb-2 shadow">
              <Text>{item?.lastMessage?.senderId?.name}</Text>
              <Text className='text-bold'> {item.lastMessage.content}</Text>

            </View>
            </TouchableOpacity>
           
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InboxScreen;
