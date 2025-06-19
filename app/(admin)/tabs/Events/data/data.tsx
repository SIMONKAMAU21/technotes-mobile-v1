// hooks/events/useEvents.ts
import { httpV1 } from "@/api/axios";
import { socket } from "@/utils/socket";
import { useQuery, useQueryClient } from "react-query";

export const useEvents = () => {
  const queryClient = useQueryClient();

  return useQuery(["events"], async () => {
    const response = await httpV1.get("/events");
    return response.data;
  }, {
    // staleTime: 1000 * 60 * 5,
    onSuccess: () => {
      // only set up listeners once
      if (!socket.hasListeners("eventAdded")) {
        socket.on("eventAdded", (newEvent) => {
          queryClient.setQueryData(["events"], (old: any = []) => [newEvent,...old]);
        });

        socket.on("eventUpdated", (updatedEvent) => {
          queryClient.setQueryData(["events"], (old: any[]) =>
            old.map((ev) => (ev._id === updatedEvent._id ? updatedEvent : ev))
          );
        });

        socket.on("eventDeleted", (eventId) => {
          queryClient.setQueryData(["events"], (old: any[]) =>
            old.filter((ev) => ev._id !== eventId)
          );
        });
      }
    },
  });
};
