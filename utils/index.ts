import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

export async function getUserToken() {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    if (token) {
      return token; // Parse and set user data
    }
  } catch (error) {
    console.error("Failed to retrieve token:", error);
  }
}

export async function setUserToken(token: string) {
  await SecureStore.setItemAsync("userToken", token);
}

export async function setUser(user: UserData) {
  const userString = JSON.stringify(user);
  await SecureStore.getItemAsync("userData", userString);
}

export const useUserData = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

    setIsLoading(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userData = await SecureStore.getItemAsync("userData");
          if (userData) {
            setUser(JSON.parse(userData));
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }, []);
  return { user, isLoading, error };
};
