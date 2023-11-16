import type { UseQueryOptions } from "react-query";
import { useMutation, useQuery } from "react-query";

import { GetUserModel, UserApi } from "../out";

export const GET_USER_KEY = "getUser";

export const userActions = {
  useUser: (config?: UseQueryOptions<GetUserModel>) =>
    useQuery({
      queryKey: GET_USER_KEY,
      queryFn: () => UserApi.getUser(),
      useErrorBoundary: false,
      notifyOnChangeProps: ["data", "error"],
      retry: false,
      ...config,
    }),
  useRegister: () => useMutation(UserApi.registerUser),
  useLogin: () => useMutation(UserApi.loginUser),
};
