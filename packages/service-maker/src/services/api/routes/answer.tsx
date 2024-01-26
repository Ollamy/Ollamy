import { UseQueryOptions, useMutation, useQuery } from "react-query";

import { queryClient } from "../../../main";
import { GetAnswerRequest, AnswerApi, AnswerModel } from "../out";
import { GET_SECTION_LESSONS_KEY } from "./section";

const GET_LESSON_KEY = "getAnswer";

export const answerActions = {
  useAnswer: (
    requestParameters: GetAnswerRequest,
    config?: UseQueryOptions<AnswerModel>,
  ) =>
    useQuery({
      queryKey: [GET_LESSON_KEY, requestParameters.id],
      queryFn: () => AnswerApi.getAnswer(requestParameters),
      ...config,
    }),
  useCreateAnswer: () =>
    useMutation(AnswerApi.registerAnswer, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
  useGetAnswer: () =>
    useMutation(AnswerApi.getAnswer, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_KEY);
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
  useUpdateAnswer: () =>
    useMutation(AnswerApi.updateAnswer, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_KEY);
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
  useRemoveAnswer: () =>
    useMutation(AnswerApi.deleteAnswer, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_KEY);
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
};
