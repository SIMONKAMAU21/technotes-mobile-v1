import { httpV1 } from "@/api/axios";
import { queryClient } from "@/app/_layout";
import { useAppActions } from "@/store/actions";
import { socket } from "@/utils/socket";
import { useQuery } from "react-query";

export const useGetUsers = () => {
  const { setGlobalError, setGlobalSuccess } = useAppActions();

  return useQuery(
    ["users"],
    async () => {
      const response = await httpV1({
        method: "GET",
        url: "/users",
      });

      return response.data;
    },
    {
      onSuccess: () => {
        if(!socket.hasListeners("userAdded")){
          socket.on("userAdded",(newUser)=>{
            queryClient.setQueryData(["users"],(old : any  =[])=>[newUser,...old])
          })
        }
        // setGlobalSuccess({
        //   visible: true,
        //   description: data.message,
        // });
        // console.log("Fetched users:", data);
      },
      onError: (error: any) => {
        const message =
          error.response?.data?.message ||
          error.message ||
          "An unexpected error occurred";
        setGlobalError({
          visible: true,
          description: message,
        });
      },
    }
  );
};