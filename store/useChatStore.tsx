import { httpV1 } from "@/api/axios";
import { create } from "zustand";
import { useAppActions } from "./actions";
import { socket } from "@/utils/socket";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,
  currentConversationId: null,

  getMessages: async (conversationId:string) => {
    set({ isMessagesLoading: true });
        socket.emit("joinConversation", conversationId);

    try {
      const res = await httpV1.get(`/messages/conversation/${conversationId}`);
      set({ 
        messages: res.data,
        currentConversationId: conversationId 
      });
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (
    payload: any,
    {
      setGlobalSuccess,
      setGlobalError,
    }: {
      setGlobalSuccess: (arg: { visible: boolean; description: string }) => void;
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
        description:res.data.message || "Sent",
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
    
    // Store the conversation ID we're subscribing to
    // set({ currentConversationId: conversationId });
    
    // Remove existing listener to avoid duplicates
    socket.off("messageAdded");
    
    // Add new listener
    socket.on("messageAdded", (newMessage) => {
      const state = get();
      console.log('newMessage', newMessage)
      // Only add message if it belongs to the current conversation
 
        set({
          messages: [...state.messages, newMessage],
        });
      
    });
  },

  unsubscribeFromMessages: () => {
    socket.off("messageAdded");
    set({ currentConversationId: null });
  },

  // Helper method to clear messages when switching conversations
  clearMessages: () => {
    set({ messages: [] });
  },
}));