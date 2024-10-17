import type { UseQueryOptions } from "react-query";
import { useQuery } from "react-query";
import { GetLastBuildUrlResponse, MobileAppApi } from "../out";

export const GET_LAST_BUILD_URL_KEY = "getLastBuildUrl";

export const mobileAppActions = {
  useLastMobileBuild: (config?: UseQueryOptions<GetLastBuildUrlResponse>) =>
    useQuery({
      queryKey: GET_LAST_BUILD_URL_KEY,
      queryFn: () => MobileAppApi.getLastBuildUrl(),
      retry: false,
      ...config,
    }),
};
