import type { UseQueryOptions } from 'react-query';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'main';
import {
  GetLessonQuestionsRequest,
  GetLessonRequest,
  LessonModel,
  QuestionModel,
} from 'services/api/out';
import { LessonApi } from 'services/api/out';
import { GET_SECTION_LESSONS_KEY } from 'services/api/routes/section';

const GET_LESSON_KEY = 'getLesson';
export const GET_LESSON_QUESTION_KEY = 'getLessonQuestion';

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
  useGetLessonQuestion: (
    requestParameters: GetLessonQuestionsRequest,
    config?: UseQueryOptions<Array<QuestionModel>>,
  ) =>
    useQuery({
      queryKey: GET_LESSON_QUESTION_KEY,
      queryFn: () => LessonApi.getLessonQuestions(requestParameters),
      ...config,
    }),
  useRemoveLesson: () =>
    useMutation(LessonApi.deleteLesson, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
};
