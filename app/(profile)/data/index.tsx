import { httpV1 } from "@/api/axios";
import { useMutation } from "react-query";
interface UpdatePassword {
    oldPassword: string;
  id: string;
  newPassword:string
}
export const useUpdatePassword = () => {
  return useMutation(
    async (payload: UpdatePassword) => {
        console.log('payload', payload)
      const response = await httpV1({
        method: "POST",
        url: `/user/password/${payload?.id}`,
        data: payload,
      });
      return response.data;
    },
    {
      onSuccess: () => {
        console.log("successful password update");
      },
      onError: (error: any) => {
        console.log("error", error);
      },
    }
  );
};
