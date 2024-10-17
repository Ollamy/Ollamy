import { useMutation } from 'react-query';
import { queryClient } from 'main';
import { AiApi } from 'services/api/out';
import { GET_LESSON_QUESTIONS_KEY } from 'services/api/routes/lesson';

export const AIAction = {
  useGenerateQuiz: () =>
    useMutation(AiApi.createAndGenerateQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_QUESTIONS_KEY);
      },
    }),
};
