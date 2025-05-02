import { httpV1 } from "@/api/axios";
import { getUserToken } from "@/utils";
import { useQuery } from "react-query";

export const useGetUsers = () => {
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
        console.log("Fetched users:", data);
      },
      onError: (error: any) => {
        console.error("Error fetching users:", error);
      },
    }
  );
};
