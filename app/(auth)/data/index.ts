import { httpV1 } from "@/api/axios";
import { setUserToken } from "@/utils";
import { useMutation } from "react-query";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const useLogin = () => {
  return useMutation(
    async (payload: LoginCredentials) => {
      const response = await httpV1({
        method: "POST",
        url: "/users/login",
        data: payload,
      });
      return response.data;
    },
    {
      onSuccess: async (data: LoginResponse) => {
        console.log('data', data)
        await setUserToken(data.token);
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
};
