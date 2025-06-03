import { httpV1 } from "@/api/axios";
import { create } from "zustand";
import { socket } from "@/utils/socket";
import { isError } from "react-query";
import Conversation from "@/app/(admin)/tabs/inbox/conversation";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  conversations: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isConversationsLoading: false,
  isSendingMessage: false,
  currentConversationId: null,
  isError: false,

  getMessages: async (conversationId: string) => {
    set({ isMessagesLoading: true });
    socket.emit("joinConversation", conversationId);
    try {
      if (
        !conversationId ||
        conversationId === "null" ||
        conversationId === "undefined"
      ) {
        return set({ messages: [], currentConversationId: null });
      }
      const res = await httpV1.get(`/messages/conversation/${conversationId}`);
      set({
        messages: res.data,
        currentConversationId: conversationId,
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  getConversations: async (userId: string) => {
     if (!userId || userId === 'undefined' || userId === 'null') {
    console.log('Invalid userId provided to getConversations');
    set({ conversations: [], isConversationsLoading: false });
    return;
  }
    set({ isConversationsLoading: true });
  
    // set({ isUsersLoading: true });
    try {
      const res = await httpV1.get(`/messages/user/${userId}/conversations`);
      set({ conversations: res.data });
    } catch (error) {
      if (isError(error)) {
        set({ isError: true });
      }
      console.error("Error fetching conversations:", error);
    } finally {
      set({ isConversationsLoading: false });
    }
  },
  sendMessage: async (
    payload: any,
    {
      setGlobalSuccess,
      setGlobalError,
    }: {
      setGlobalSuccess: (arg: {
        visible: boolean;
        description: string;
      }) => void;
      setGlobalError: (arg: { visible: boolean; description: string }) => void;
    }
  ) => {
    const currentState = get();
    set({ isSendingMessage: true });

    try {
      const res = await httpV1.post(`/message/add`, payload);

      // Add the new message to the current messages
      // set({
      //   messages: [...currentState.messages, res.data]
      // });

      setGlobalSuccess({
        visible: true,
        description: res.data.message || "Sent",
      });
    } catch (error) {
      console.error("Error sending message:", error);

      setGlobalError({
        visible: true,
        description: error.response?.data?.message || "Failed to send message",
      });

      throw error; // Re-throw so the component can handle it
    } finally {
      set({ isSendingMessage: false });
    }
  },

  subscribeToMessages: () => {
    const currentState = get();

    socket.off("messageAdded");
    socket.off("userConversationsFetched");

    // Add new listener
    socket.on("messageAdded", (newMessage) => {
      const state = get();
      // Only add message if it belongs to the current conversation

      set({
        messages: [...state.messages, newMessage],
      });
    });

    socket.on("userConversationsFetched", (populated) => {
      const state = get();
      console.log("populated", populated);
      // Only add message if it belongs to the current conversation

      set({
        conversations: [...state.conversations, populated],
      });
    });
  },

  unsubscribeFromMessages: () => {
    socket.off("messageAdded");
    socket.off("userConversationsFetched");
    set({ currentConversationId: null });
  },

  // Helper method to clear messages when switching conversations
  clearMessages: () => {
    set({ messages: [] });
  },
  clearConversations: () => {
    set({ conversations: [] });
  },
}));
