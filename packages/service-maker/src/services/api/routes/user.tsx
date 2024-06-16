import type { UseQueryOptions } from 'react-query';
import { useMutation, useQuery } from 'react-query';
import type { GetUserModel, UserCoursesResponse } from 'services/api/out';
import { UserApi } from 'services/api/out';

export const GET_USER_COURSES_KEY = 'getUserCoursesKey';
const GET_USER_KEY = 'getUserKey';

export const userActions = {
  useLogout: () => useMutation(UserApi.logoutUser),
  useGetUser: (config?: UseQueryOptions<GetUserModel>) =>
    useQuery({
      queryKey: GET_USER_KEY,
      queryFn: () => UserApi.getUser(),
      ...config,
    }),
  useGetUserCourses: (config?: UseQueryOptions<UserCoursesResponse>) =>
    useQuery({
      queryKey: GET_USER_COURSES_KEY,
      queryFn: () => UserApi.getUserCourses(),
      ...config,
    }),
  useRegister: () => useMutation(UserApi.registerUser),
  useLogin: () => useMutation(UserApi.loginUser),
};
