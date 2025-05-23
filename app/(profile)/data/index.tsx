import { httpV1 } from "@/api/axios";
import { useMutation } from "react-query";
import * as SecureStore from "expo-secure-store";
import { useUserStore } from "@/store";
import { useAppActions } from "@/store/actions";
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
  const{setGlobalError,setGlobalSuccess}= useAppActions()

  return useMutation(
    async (payload: UpdatePassword) => {
      const response = await httpV1({
        method: "POST",
        url: `/user/password/${payload?.id}`,
        data: payload,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setGlobalSuccess({
          visible:true,
          description:data?.message
        })
      },
      onError: (error: any) => {
        const errorMsg = error?.response?.data?.message || error?.message || "Failed to update password"
        setGlobalError({
          visible:true,
          description:errorMsg
        })
        console.log("error", error);
      },
    }
  );
};

export const useUpdatePicture = () => {
  const{setGlobalError,setGlobalSuccess}= useAppActions()

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
        setGlobalSuccess({
          visible:true,
          description:data?.message || "Photo updated successfull"
        })
        const userData = await SecureStore.getItemAsync("userData");
        if (userData) {
          const currentUserData = JSON.parse(userData);
          const updatedUserData = {
            ...currentUserData,
            photo: data?.user?.photo,
          };
          await SecureStore.setItemAsync(
            "userData",
            JSON.stringify(updatedUserData)
          );

        }
      },
      onError: (error: any) => {
        const errorMsg = error?.response?.data?.message || error?.message || "Failed to update profile picture"
        setGlobalError({
          visible:true,
          description:errorMsg
        })
        console.log("error", error);
      },
    }
  );
};
