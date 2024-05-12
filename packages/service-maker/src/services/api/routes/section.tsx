import { UseQueryOptions, useMutation, useQuery } from 'react-query';
import {
  GetSectionLessonsRequest,
  GetSectionRequest,
  LessonModel,
  SectionApi,
  SectionModel,
} from 'services/api/out';
import { queryClient } from 'main';
import { GET_COURSE_SECTIONS_KEY } from 'services/api/routes/course';

export const GET_SECTION_KEY = 'getSection';
export const GET_SECTION_LESSONS_KEY = 'getSectionLesson';

export const sectionActions = {
  useSection: (
    requestParameters: GetSectionRequest,
    config?: UseQueryOptions<SectionModel>,
  ) =>
    useQuery({
      queryKey: [GET_SECTION_KEY, requestParameters.id],
      queryFn: () => SectionApi.getSection(requestParameters),
      ...config,
    }),
  useSectionLessons: (
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
};
