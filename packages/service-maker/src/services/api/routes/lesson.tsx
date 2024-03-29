import { UseQueryOptions, useMutation, useQuery } from "react-query";

import { queryClient } from "../../../main";
import { GetLessonRequest, LessonApi, LessonModel } from "../out";
import { GET_SECTION_LESSONS_KEY } from "./section";

const GET_LESSON_KEY = "getLesson";

export const lessonActions = {
  useLesson: (
    requestParameters: GetLessonRequest,
    config?: UseQueryOptions<LessonModel>,
  ) =>
    useQuery({
      queryKey: [GET_LESSON_KEY, requestParameters.id],
      queryFn: () => LessonApi.getLesson(requestParameters),
      ...config,
    }),
  useCreateLesson: () =>
    useMutation(LessonApi.registerLesson, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
  useUpdateLesson: () =>
    useMutation(LessonApi.updateLesson, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_KEY);
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
  useGetQuestion: () =>
    useMutation(LessonApi.getLessonQuestions, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_KEY);
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
};
