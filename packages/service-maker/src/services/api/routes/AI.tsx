import { useMutation } from 'react-query';
import { queryClient } from 'main';
import { AiApi } from 'services/api/out';
import { GET_LESSON_QUESTIONS_KEY } from 'services/api/routes/lesson';
import { GET_USER_COURSES_KEY } from 'services/api/routes/user';

export const AIAction = {
  useGenerateQuiz: () =>
    useMutation(AiApi.createAndGenerateQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_QUESTIONS_KEY);
      },
    }),
  useGenerateCourse: () =>
    useMutation(AiApi.generateCourse, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_USER_COURSES_KEY);
      },
    }),
};
