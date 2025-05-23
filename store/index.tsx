import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { deleteUserData, setUser } from '@/utils';

interface UserData {
  id: string;
  name: string;
  email: string;
  photo: string | undefined;
  role: 'admin' | 'teacher' | 'student';
}

interface UserState {
  userData: UserData | null;
  isLoading: boolean;
  error: Error | null;
  isHydrated: boolean;

  initialize: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  updateUserPhoto: (photoUrl: string) => Promise<boolean>;
  setUserData: (data: UserData | null) => void;
  setHydrated: () => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  userData: null,
  isLoading: false,
  error: null,
  isHydrated: false, // ✅ must start as false

  // initialize: async () => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const storedData = await SecureStore.getItemAsync('userData');
  //     if (storedData) {
  //       set({ userData: JSON.parse(storedData) });
  //     } else {
  //       set({ userData: null });
  //     }
  //   } catch (error) {
  //     set({
  //       error: error instanceof Error ? error : new Error('Failed to load user data'),
  //     });
  //   } finally {
  //     set({ isLoading: false, isHydrated: true }); // ✅ ensure hydration completes
  //   }
  // },
  initialize: async () => {
    set({ isLoading: true, error: null });
    try {
      const storedData = await SecureStore.getItemAsync('userData');
      if (storedData) {
        set({ userData: JSON.parse(storedData) });
      } else {
        set({ userData: null });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error : new Error('Failed to load user data'),
      });
    } finally {
      set({ isLoading: false, isHydrated: true });
    }
  },
  
  refreshUserData: async () => {
    set({ isLoading: true, error: null });
    try {
      const storedData = await SecureStore.getItemAsync('userData');
      if (storedData) {
        set({ userData: JSON.parse(storedData) });
      } else {
        set({ userData: null });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to refresh user data'),
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateUserPhoto: async (photoUrl: string) => {
    const { userData } = get();
    if (!userData) return false;
    try {
      const updatedUserData = { ...userData, photo: photoUrl };
      await SecureStore.setItemAsync('userData', JSON.stringify(updatedUserData));
      set({ userData: updatedUserData });
      return true;
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to update photo'),
      });
      return false;
    }
  },

  setUserData: async (data: UserData | null) => {
    try {
      if (data) {
        await setUser(data);
      } else {
        await deleteUserData();
      }
      set({ userData: data });
    } catch (error) {
      set({
        error: error instanceof Error ? error : new Error('Failed to set user data'),
      });
    }
  },
  setHydrated: () => set({ isHydrated: true }),

  // setHydrated: () => set({ isHydrated: true }),
}));

export const initializeUserStore = async () => {
  await useUserStore.getState().initialize();
};
