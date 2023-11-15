import type { UseQueryOptions } from "react-query";
import { useMutation, useQuery } from "react-query";
import axios from "axios";

export const GET_USER_KEY = "getUser";

export const userActions = {
  useUser: (config: UseQueryOptions<any>) =>
    useQuery({
      queryKey: GET_USER_KEY,
      queryFn: () => axios.get("http://localhost:3000/user"),
      useErrorBoundary: false,
      notifyOnChangeProps: ["data", "error"],
      retry: false,
      ...config,
    }),
  useRegister: () =>
    useMutation((params) =>
      axios.post("http://localhost:3000/user/register", params),
    ),
};
