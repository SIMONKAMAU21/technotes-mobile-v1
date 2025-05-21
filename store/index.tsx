// userStore.ts
import {create} from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { deleteUserData, setUser } from '@/utils';

// Define the user data type
interface UserData {
  id: string;
  name: string;
  email: string;
  photo: string | undefined;
  role: 'admin' | 'teacher' | 'student';
}

// Define the store state
interface UserState {
  userData: UserData | null;
  isLoading: boolean;
  error: Error | null;
  
  // Actions
  initialize: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  updateUserPhoto: (photoUrl: string) => Promise<boolean>;
  setUserData: (data: UserData | null) => void;
}

// Create the store
export const useUserStore = create<UserState>((set, get) => ({
  userData: null,
  isLoading: false,
  error: null,
  
  // Initialize the store with data from SecureStore
  initialize: async () => {
    set({ isLoading: true, error: null });
    try {
      const storedData = await SecureStore.getItemAsync('userData');
      console.log('storedData', storedData)
      if (storedData) {
        set({ userData: JSON.parse(storedData), isLoading: false });
      } else {
        set({ userData: null, isLoading: false });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error : new Error('Failed to load user data'), 
        isLoading: false 
      });
    }
  },
  
  // Refresh user data from SecureStore
  refreshUserData: async () => {
    set({ isLoading: true, error: null });
    try {
      const storedData = await SecureStore.getItemAsync('userData');
      if (storedData) {
        set({ userData: JSON.parse(storedData), isLoading: false });
      } else {
        set({ userData: null, isLoading: false });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error : new Error('Failed to refresh user data'), 
        isLoading: false 
      });
    }
  },
  
  // Update user photo in both store and SecureStore
  updateUserPhoto: async (photoUrl: string) => {
    const { userData } = get();
    if (!userData) {
      console.warn('Cannot update photo: No user data available');
      return false;
    }
    
    try {
      // Create updated user data
      const updatedUserData = {
        ...userData,
        photo: photoUrl,
      };
      
      // Update in SecureStore
      await SecureStore.setItemAsync('userData', JSON.stringify(updatedUserData));
      
      // Update in Zustand store
      set({ userData: updatedUserData });
      
      return true;
    } catch (error) {
      console.error('Failed to update user photo:', error);
      set({ error: error instanceof Error ? error : new Error('Failed to update photo') });
      return false;
    }
  },
  
  // Directly set user data (useful for login/logout)
  setUserData: async (data: UserData | null) => {
    try {
      if (data) {
        await setUser(data)
      } else {
        await deleteUserData();
      }
      set({ userData: data });
    } catch (error) {
      console.error('Failed to persist user data:', error);
      set({ error: error instanceof Error ? error : new Error('Failed to set user data') });
    }
  },
  
}));

// Initialize the store when app starts
// You can call this in your App.tsx or in a startup routine
export const initializeUserStore = async () => {
  await useUserStore.getState().initialize();
};