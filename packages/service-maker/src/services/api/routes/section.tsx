import { useMutation } from "react-query";

import { queryClient } from "../../../main";
import { SectionApi } from "../out";
import { GET_COURSE_SECTIONS_KEY } from "./course";

export const sectionActions = {
  useCreateSection: () =>
    useMutation(SectionApi.registerSection, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_COURSE_SECTIONS_KEY);
      },
    }),
};
