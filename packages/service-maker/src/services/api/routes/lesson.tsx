import { useMutation } from "react-query";

import { queryClient } from "../../../main";
import { LessonApi } from "../out";
import { GET_SECTION_LESSONS_KEY } from "./section";

export const lessonActions = {
  useCreateLesson: () =>
    useMutation(LessonApi.registerLesson, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_SECTION_LESSONS_KEY);
      },
    }),
};
