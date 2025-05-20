import { initializeSocketEvents } from '@/utils/socketManager';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

export const useSocketConnection = (userId: string | undefined) => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    if (userId) {
      console.log('Setting up socket connection for user:', userId);
      const cleanup = initializeSocketEvents(queryClient, userId);
      
      return () => {
        cleanup();
      };
    }
  }, [userId, queryClient]);
};