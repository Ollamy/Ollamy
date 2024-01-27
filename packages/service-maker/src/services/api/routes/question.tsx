import { UseQueryOptions, useMutation, useQuery } from 'react-query';
import { queryClient } from 'src/main';
import { GetQuestionRequest, QuestionApi, QuestionModel } from 'src/services/api/out';
import { GET_SECTION_LESSONS_KEY } from 'src/services/api/routes/section';

const GET_LESSON_KEY = 'getQuestion';

export const questionActions = {
  useQuestion: (requestParameters: GetQuestionRequest, config?: UseQueryOptions<QuestionModel>) =>
    useQuery({
      queryKey: [GET_LESSON_KEY, requestParameters.id],
      queryFn: () => QuestionApi.getQuestion(requestParameters),
      ...config,
    }),
  useCreateQuestion: () =>
    useMutation(QuestionApi.registerQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
  useGetQuestion: () =>
    useMutation(QuestionApi.getQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_KEY);
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
  useUpdateQuestion: () =>
    useMutation(QuestionApi.updateQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_KEY);
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
  useRemoveQuestion: () =>
    useMutation(QuestionApi.deleteQuestion, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_KEY);
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
};
