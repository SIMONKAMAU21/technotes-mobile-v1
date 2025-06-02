import { QueryClient } from "react-query";
import { socket } from "./socket";

export const initializeSocketEvents = (queryClient: QueryClient, userId: string) => {
  socket.on("connected", () => {
    console.log("connected");
  });

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

  // Optional: return cleanup method
  return () => {
    socket.off("userConversationsFetched");
    socket.off("messagesInConversationFetched");
    socket.off("messageAdded");
    // socket.disconnect();
  };
};
