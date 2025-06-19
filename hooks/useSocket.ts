import { socket } from '@/utils/socket';
import { initializeSocketEvents } from '@/utils/socketManager';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

export const useSocketConnection = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    if (userId) {
    socket.emit("join", userId); // Tell backend to add this socket to userId room
      console.log('Setting up socket connection for user:', userId);
      const cleanup = initializeSocketEvents(queryClient, userId);
      
      return () => {
        cleanup();
      };
    }
  }, [userId, queryClient]);
};