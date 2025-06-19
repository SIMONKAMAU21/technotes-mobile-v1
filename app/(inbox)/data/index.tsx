import { httpV1 } from "@/api/axios";
import { queryClient } from "@/app/_layout";
import { useSocketConnection } from "@/hooks/useSocket";
import { useUserStore } from "@/store";
import { useAppActions } from "@/store/actions";
import { socket } from "@/utils/socket";
import { useMutation, useQuery } from "react-query";

export const useGetInbox = () => {
  const user = useUserStore((state) => state.userData); // This should be synchronous
  useSocketConnection(user?.id);
  const { setGlobalError, setGlobalSuccess } = useAppActions();
  return useQuery(
    ["inbox"],
    async () => {
      const response = await httpV1({
        method: "GET",
        url: `/messages/user/${user?.id}/conversations`,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        if(!socket.hasListeners("userConversationsFetched")){
          socket.on("userConversationsFetched",(newConversation)=>{
            queryClient.setQueryData(["inbox"],(old : any = [])=> {
              // Check if the new conversation already exists
              const exists = old.some((conv: any) => conv._id === newConversation._id);
              if (exists) {
                // If it exists, return the old data without modification
                return old;
              }
              // If it doesn't exist, add the new conversation to the front
              return [newConversation, ...old];
            })
          })
        }
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
