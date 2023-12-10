import { useMutation } from "react-query";

import { queryClient } from "../../../main";
import { CourseApi } from "../out";
import { GET_USER_COURSES_KEY } from "./user";


export const courseActions = {
    useCreateCourse: () => useMutation(CourseApi.postCourse, {
        onSuccess: () => {
          queryClient.invalidateQueries(GET_USER_COURSES_KEY);
        },
      }),
};
