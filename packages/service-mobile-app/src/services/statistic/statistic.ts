import { api } from 'src/services/api';

import type { GetUserCourseStatisticResponse } from './statistic.dto';

export const statisticApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserCourseStatistic: build.query<GetUserCourseStatisticResponse, string>({
      query: (id) => ({
        url: `/statistic/STUDENT/ALL`,
        method: 'GET',
        params: { courseId: id },
      }),
      providesTags: (resp, err, id) => [{ type: 'Statistic' }],
    }),
  }),
});

export const { useGetUserCourseStatisticQuery } = statisticApi;
