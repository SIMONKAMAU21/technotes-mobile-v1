import { httpV1 } from "@/api/axios";
import { queryClient } from "@/app/_layout";
import { useAppActions } from "@/store/actions";
import { useQuery } from "react-query";
import { socket } from "@/utils/socket";
import { useEffect } from "react";

export const useGetUsers = () => {
  const { setGlobalError, setGlobalSuccess } = useAppActions();

  // Set up socket listeners once when the hook is first used
  useEffect(() => {
    // Remove existing listeners to prevent duplicates
    socket.off("userAdded");
    socket.off("userUpdated");
    socket.off("userDeleted");

    // Add fresh listeners
    socket.on("userAdded", (newUser) => {
      queryClient.setQueryData(["users"], (old: any = []) => [newUser, ...old]);
    });

    // socket.on("userFetched", (updatedUser) => {
    //   console.log("userFetched", updatedUser);
    //   queryClient.setQueryData(["users"], (old: any = []) => [
    //     updatedUser,
    //     ...old,
    //   ]);
    // });

    socket.on("userDeleted", (deletedData) => {
      queryClient.setQueryData(["users"], (old: any = []) =>
        old.filter((user: any) => {
          return user._id !== deletedData; // Return the comparison result
        })
      );
    });

    // Cleanup function to remove listeners when component unmounts
    return () => {
      socket.off("userAdded");
      socket.off("userUpdated");
      socket.off("userDeleted");
    };
  }, []);

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
      onSuccess: (data) => {
        // setGlobalSuccess({
        //   visible: true,
        //   description: data.message,
        // });
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
