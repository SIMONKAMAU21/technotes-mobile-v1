import { QueryClient } from "react-query";
import { socket } from "./socket";

export const initializeSocketEvents = (queryClient: QueryClient, userId: string) => {
  console.log('Initializing socket events for userId:', userId);
  socket.emit("join", { userId });

  // ✅ Listen for updated user conversations
  socket.on("userConversationsFetched", (populated) => {
    queryClient.setQueryData(["inbox", userId], (oldData: any[] = []) => {
      const updated = [...(oldData || [])];

      (Array.isArray(populated) ? populated : [populated]).forEach((item) => {
        const existingIndex = updated.findIndex(c => c.conversationId === item.conversationId);
        if (existingIndex !== -1) {
          // Update existing conversation data
          updated[existingIndex] = { ...updated[existingIndex], ...item };
        } else {
          // Add new conversation
          updated.push(item);
        }
      });

      return updated;
    });
  });

  // ✅ Listen for messages in a conversation
  socket.on("messagesInConversationFetched", (messages) => {
    const convId = messages[0]?.conversationId;
    if (!convId) return;

    queryClient.setQueryData(["conversation", convId], messages);
  });

  // ✅ Listen for a newly added message
  socket.on("messageAdded", (message) => {
    const convId = message.conversationId;

    // Update the conversation messages
    queryClient.setQueryData(["conversation", convId], (oldMessages: any[] = []) => {
      if (oldMessages.some((m) => m._id === message._id)) return oldMessages;
      return [...oldMessages, message];
    });

    // Also update the inbox to show the latest message
    queryClient.setQueryData(["inbox", userId], (oldConversations: any[] = []) => {
      return oldConversations.map(conversation => {
        if (conversation.conversationId === convId) {
          return {
            ...conversation,
            lastMessage: message.text,
            updatedAt: message.createdAt || new Date().toISOString(),
          };
        }
        return conversation;
      });
    });
  });

  // Optional: return cleanup method
  return () => {
    console.log('Cleaning up socket event listeners');
    socket.off("userConversationsFetched");
    socket.off("messagesInConversationFetched");
    socket.off("messageAdded");
    socket.disconnect();
  };
};
