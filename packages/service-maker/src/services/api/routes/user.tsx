import type { UseQueryOptions } from "react-query";
import { useMutation, useQuery } from "react-query";

// eslint-disable-next-line import/no-cycle
import { queryClient } from "../../../main";
import type { GetUserModel, UserCoursesResponse } from "../out";
import { UserApi } from "../out";

export const GET_USER_KEY = "getUser";
export const GET_USER_COURSES_KEY = "getUserCourses";

export const userActions = {
  useUser: (config?: UseQueryOptions<GetUserModel>) =>
    useQuery({
      queryKey: GET_USER_KEY,
      queryFn: () => UserApi.getUser(),
      retry: false,
      ...config,
    }),
  useUserCourses: (config?: UseQueryOptions<UserCoursesResponse>) =>
    useQuery({
      queryKey: GET_USER_COURSES_KEY,
      queryFn: () => UserApi.getUserCourses(),
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
