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
      onSuccess: async (data:LoginResponse) => {
        // setUserToken doesn't return anything (void), so token will be undefined
        // await setUserToken(data.token);
        // If you need the token value, get it directly from data
      },
      onError: (error: any) => {
        console.log(error);
      },
    },
  );
};
