import { httpV1 } from "@/api/axios";
import { useMutation } from "react-query";
import * as SecureStore from "expo-secure-store";
import { useUserStore } from "@/store";
interface UpdatePassword {
  oldPassword: string;
  user_id: string;
  id: string;
  formData: {
    name: string;
    type: string;
    uri: string;
  };
  newPassword: string;
}
export const useUpdatePassword = () => {
  return useMutation(
    async (payload: UpdatePassword) => {
      console.log("payload", payload);
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

export const useUpdatePicture = () => {
  // const updateUserData = useUserStore(state => state.updateUserPhoto)

  return useMutation(
    async (payload: UpdatePassword) => {
      const response = await httpV1({
        method: "POST",
        url: `/user/${payload.user_id}/upload-photo`,
        data: payload.formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    },
    {
      onSuccess: async (data) => {
        const userData = await SecureStore.getItemAsync("userData");
        console.log("userData", userData);
        if (userData) {
          const currentUserData = JSON.parse(userData);
          const updatedUserData = {
            ...currentUserData,
            photo: data.user.photo,
          };
          await SecureStore.setItemAsync(
            "userData",
            JSON.stringify(updatedUserData)
          );

        }
      },
      onError: (error: any) => {
        console.log("error", error);
      },
    }
  );
};
