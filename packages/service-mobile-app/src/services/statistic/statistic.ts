import { api } from 'src/services/api';
import { GetUserCourseStatisticResponse } from './statistic.dto';

export const statisticApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserCourseStatistic: build.query<GetUserCourseStatisticResponse, string>({
      query: (id) => ({
        url: `/statistic/STUDENT/ALL`,
        method: 'GET',
        params: { courseId: id }
      }),
      providesTags: (resp, err, id) => [{ type: 'Statistic', id: id }],
    }),
  }),
});

export const { useGetUserCourseStatisticQuery } = statisticApi;
