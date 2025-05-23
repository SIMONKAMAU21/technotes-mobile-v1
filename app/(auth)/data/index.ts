import { httpV1 } from "@/api/axios";
import { useAppActions } from "@/store/actions";
import { setUserToken } from "@/utils";
import { useMutation } from "react-query";

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  message:string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export const useLogin = () => {
  const {setGlobalError,setGlobalSuccess} = useAppActions()
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
        setGlobalSuccess({
          visible:true,
          description:data.message +" " + `${data.user.name}`
        })
      },
      onError: (error: any) => {
        const message =
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred';
    
        setGlobalError({
          visible:true,
          description:message
        })
      },
    },
  );
};
