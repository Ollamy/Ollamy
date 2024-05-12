import type { UseQueryOptions } from 'react-query';
import { useMutation, useQuery } from 'react-query';
import type { UserCoursesResponse } from 'services/api/out';
import { UserApi } from 'services/api/out';

export const GET_USER_COURSES_KEY = 'getUserCoursesKey';

export const userActions = {
  useGetUserCourses: (config?: UseQueryOptions<UserCoursesResponse>) =>
    useQuery({
      queryKey: GET_USER_COURSES_KEY,
      queryFn: () => UserApi.getUserCourses(),
      ...config,
    }),
  useRegister: () => useMutation(UserApi.registerUser),
  useLogin: () => useMutation(UserApi.loginUser),
};
