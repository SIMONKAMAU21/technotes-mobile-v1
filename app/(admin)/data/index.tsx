import { httpV1 } from "@/api/axios";
import { useAppActions } from "@/store/actions";
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
      onSuccess: (data) => {
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

export const useAddUser = () => {
  const queryClient = useQueryClient();
  const { setGlobalError, setGlobalSuccess } = useAppActions();

  return useMutation(
    ["users"],
    async (payload: AddUserPayload) => {
      const response = await httpV1({
        method: "POST",
        url: "/users/add",
        data: payload,
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        setGlobalSuccess({
          visible: true,
          description: data.message,
        }),
          queryClient.invalidateQueries(["users"]);
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

export const useDeleteUser = (id: string) => {
  const queryClient = useQueryClient();
  const { setGlobalError, setGlobalSuccess } = useAppActions();

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
        setGlobalSuccess({
          visible: true,
          description: data.message,
        }),
          queryClient.invalidateQueries(["users"]);
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
        console.error("Error deleting user:", error);
      },
    }
  );
};

export const useUpdateUser = (id: string) => {
  const queryClient = useQueryClient();
  const { setGlobalError, setGlobalSuccess } = useAppActions();

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
        setGlobalSuccess({
          visible: true,
          description: data.message,
        }),
          queryClient.invalidateQueries(["users"]);
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
