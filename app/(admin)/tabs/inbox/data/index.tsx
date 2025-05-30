import { httpV1 } from "@/api/axios";
import { useSocketConnection } from "@/hooks/useSocket";
import { useUserStore } from "@/store";
import { useAppActions } from "@/store/actions";
import { useUserData } from "@/utils";
import { useMutation, useQuery } from "react-query";

export const useGetInbox = () => {
  const user = useUserStore((state) => state.userData); // This should be synchronous
  useSocketConnection(user?.id);
  const { setGlobalError, setGlobalSuccess } = useAppActions();

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
      onSuccess: (data) => {},
      onError: (error: any) => {
        const errorMsg =
          error?.response?.data?.message ||
          error?.message ||
          "Unexpected Error occured";

        setGlobalError({
          visible: true,
          description: errorMsg,
        });
      },
    }
  );
};

export const useGetConversation = (conversationId: string) => {
  const { setGlobalError, setGlobalSuccess } = useAppActions();

  return useQuery(
    ["conversation", conversationId],
    async () => {
      const response = await httpV1({
        method: "GET",
        url: `/messages/conversation/${conversationId}`,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log('data', data)
      },
      onError: (error: any) => {
        const errorMsg =
          error?.response?.data?.message ||
          error?.message ||
          "Unexpected Error occured";

        setGlobalError({
          visible: true,
          description: errorMsg,
        });
      },
       staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const useSendMessage = () => {
  const { setGlobalError, setGlobalSuccess } = useAppActions();

  return useMutation(
    async (payload) => {
      const response = await httpV1({
        method: "POST",
        url: `/message/add`,
        data: payload,
      });
      return response;
    },
    {
      onSuccess: (data:any) => {
        setGlobalSuccess({
          visible: true,
          description: data?.message || "Message Sent",
        });
      },
      onError: (error: any) => {
        const errorMsg =
          error?.response?.data?.message ||
          error?.message ||
          "Unexpected Error occured";

        setGlobalError({
          visible: true,
          description: errorMsg,
        });
      },
    }
  );
};
