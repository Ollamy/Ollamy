import type { UseQueryOptions } from 'react-query';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'main';
import type {
  GetSectionLessonsRequest,
  GetSectionRequest,
  LessonModel,
  GetSectionModel,
} from 'services/api/out';
import { SectionApi } from 'services/api/out';
import { GET_COURSE_SECTIONS_KEY } from 'services/api/routes/course';

export const GET_SECTION_KEY = 'getSectionKey';
export const GET_SECTION_LESSONS_KEY = 'getSectionLessonKey';

export const sectionActions = {
  useSection: (
    requestParameters: GetSectionRequest,
    config?: UseQueryOptions<GetSectionModel>,
  ) =>
    useQuery({
      queryKey: [GET_SECTION_KEY, requestParameters.id],
      queryFn: () => SectionApi.getSection(requestParameters),
      ...config,
    }),
  useGetSectionLessons: (
    requestParameters: GetSectionLessonsRequest,
    config?: UseQueryOptions<Array<LessonModel>>,
  ) =>
    useQuery({
      queryKey: [GET_SECTION_LESSONS_KEY, requestParameters.id],
      queryFn: () => SectionApi.getSectionLessons(requestParameters),
      ...config,
    }),
  useCreateSection: () =>
    useMutation(SectionApi.registerSection, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_COURSE_SECTIONS_KEY);
      },
    }),
  useUpdateSection: () =>
    useMutation(SectionApi.updateSection, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_SECTION_KEY);
        queryClient.invalidateQueries(GET_COURSE_SECTIONS_KEY);
      },
    }),
  useRemoveSection: () =>
    useMutation(SectionApi.deleteSection, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_COURSE_SECTIONS_KEY);
      },
    }),
};
