import { UseQueryOptions, useMutation, useQuery } from "react-query";

import { queryClient } from "../../../main";
import { GetSectionLessonsRequest, LessonModel, SectionApi } from "../out";
import { GET_COURSE_SECTIONS_KEY } from "./course";

export const GET_SECTION_LESSONS_KEY = "getSectionLesson";

export const sectionActions = {
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
};
