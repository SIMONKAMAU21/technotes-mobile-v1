import { httpV1 } from "@/api/axios";
import { useUserData } from "@/utils";
import { useMutation, useQuery } from "react-query";

export const useGetInbox = () => {
  const { user } = useUserData(); // This should be synchronous

  return useQuery(
    ["inbox", user?.id],
    async () => {
      const response = await httpV1({
        method: "GET",
        url: `/messages/user/${user?.id}/conversations`,
      });
      return response.data;
    },
    {
      enabled: !!user?.id, // only run if user ID exists
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
};

export const useGetConversation = (conversationId: string) => {
  return useQuery(["conversation", conversationId], async () => {
    const response = await httpV1({
      method: "GET",
      url: `/messages/conversation/${conversationId}`,
    });
    return response.data;
  });
};

export const useSendMessage = () => {
  return useMutation(async (payload) => {
    const response = await httpV1({
      method: "POST",
      url: `/message/add`,
      data: payload,
    });
    return response;
  });
};
