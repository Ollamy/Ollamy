import { api } from 'src/services/api';

import type { GetBadgeResponse } from './badge.dto';

export const badgeApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUserUnlockedBadges: build.query<GetBadgeResponse, void>({
      query: () => ({
        url: `/badge/unlocked`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetUserUnlockedBadgesQuery } = badgeApi;
