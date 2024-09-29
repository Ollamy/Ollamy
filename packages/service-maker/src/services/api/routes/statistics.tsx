import type { UseQueryOptions } from 'react-query';
import { useQuery } from 'react-query';
import type { GradeRequest, GradeStatisticModel } from 'services/api/out';
import { StatisticApi } from 'services/api/out';

const GET_STATISTICS_KEY = 'getStatisticsKey';

export const statisticsActions = {
  useStatistics: (
    requestParameters: GradeRequest,
    config?: UseQueryOptions<GradeStatisticModel[]>,
  ) =>
    useQuery({
      queryKey: [
        GET_STATISTICS_KEY,
        requestParameters.courseId,
        requestParameters.operation,
        requestParameters.type,
      ],
      queryFn: () => StatisticApi.grade(requestParameters),
      ...config,
    }),
};
