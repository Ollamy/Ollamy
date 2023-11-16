import type { UseQueryOptions } from "react-query";
import { useMutation, useQuery } from "react-query";

import { queryClient } from "../../../main";
import { GetUserModel, UserApi } from "../out";

export const GET_USER_KEY = "getUser";

export const userActions = {
  useUser: (config?: UseQueryOptions<GetUserModel>) =>
    useQuery({
      queryKey: GET_USER_KEY,
      queryFn: () => UserApi.getUser(),
      retry: false,
      ...config,
    }),
  useRegister: () => useMutation(UserApi.registerUser),
  useLogin: () => useMutation(UserApi.loginUser),
  useUpdate: () =>
    useMutation(UserApi.updateUser, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_USER_KEY);
      },
    }),
};
