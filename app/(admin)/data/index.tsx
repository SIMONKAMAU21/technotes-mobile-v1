import { httpV1 } from "@/api/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface AddUserPayload {
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  address: string;
}

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
        // console.log("Fetched users:", data);
      },
      onError: (error: any) => {
        console.error("Error fetching users:", error);
      },
    }
  );
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation(
    ["users"],
    async (payload: AddUserPayload) => {
      console.log("payload", payload);
      const response = await httpV1({
        method: "POST",
        url: "/users/add",
        data: payload,
      });
      console.log("response", response);
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("User added successfully:", data);
        queryClient.invalidateQueries(["users"]);
      },
      onError: (error: any) => {
        console.error("Error adding user:", error);
      },
    }
  );
};

export const useDeleteUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["users"],
    async () => {
      const response = await httpV1({
        method: "DELETE",
        url: `/users/${id}`,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("User deleted successfully:", data);
        queryClient.invalidateQueries(["users"]);
      },
      onError: (error: any) => {
        console.error("Error deleting user:", error);
      },
    }
  );
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation(
    ["users"],  
    async (payload: AddUserPayload) => {
      const response = await httpV1({
        method: "PUT",
        url: `/user/${id}`,
        data: payload,
      }); 
      return response.data;
    },
    {
      onSuccess: (data) => {
        console.log("User updated successfully:", data);
        queryClient.invalidateQueries(["users"]);
      },
      onError: (error: any) => {
        console.error("Error updating user:", error);
      },
    }
  );
};