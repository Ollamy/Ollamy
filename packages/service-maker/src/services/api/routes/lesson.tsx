import type { UseQueryOptions } from 'react-query';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'main';
import type {
  GetLessonQuestionsRequest,
  GetLessonRequest,
  LessonModel,
  QuestionModel,
} from 'services/api/out';
import { LessonApi } from 'services/api/out';
import { GET_SECTION_LESSONS_KEY } from 'services/api/routes/section';

const GET_LESSON_KEY = 'getLessonKey';
export const GET_LESSON_QUESTIONS_KEY = 'getLessonQuestionKey';

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
  useGetLessonQuestions: (
    requestParameters: GetLessonQuestionsRequest,
    config?: UseQueryOptions<Array<QuestionModel>>,
  ) =>
    useQuery({
      queryKey: [GET_LESSON_QUESTIONS_KEY, requestParameters.id],
      queryFn: () => LessonApi.getLessonQuestions(requestParameters),
      ...config,
    }),
  useCreateLesson: () =>
    useMutation(LessonApi.registerLesson, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
  useRemoveLesson: () =>
    useMutation(LessonApi.deleteLesson, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
};
