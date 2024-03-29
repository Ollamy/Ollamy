import type { UseQueryOptions } from "react-query";
import { useMutation, useQuery } from "react-query";

// eslint-disable-next-line import/no-cycle
import { queryClient } from "../../../main";
import type {
  CourseModel,
  GetCourseRequest,
  GetCourseSectionsRequest,
  SectionModel,
} from "../out";
import { CourseApi } from "../out";

import { GET_USER_COURSES_KEY } from "./user";

const GET_COURSE_KEY = "getCourse";
export const GET_COURSE_SECTIONS_KEY = "getCourseSections";

export const courseActions = {
  useCourse: (
    requestParameters: GetCourseRequest,
    config?: UseQueryOptions<CourseModel>
  ) =>
    useQuery({
      queryKey: GET_COURSE_KEY,
      queryFn: () => CourseApi.getCourse(requestParameters),
      ...config,
    }),
  useCourseSection: (
    requestParameters: GetCourseSectionsRequest,
    config?: UseQueryOptions<Array<SectionModel>>
  ) =>
    useQuery({
      queryKey: GET_COURSE_SECTIONS_KEY,
      queryFn: () => CourseApi.getCourseSections(requestParameters),
      ...config,
    }),
  useCreateCourse: () =>
    useMutation(CourseApi.postCourse, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_COURSE_KEY);
        queryClient.invalidateQueries(GET_USER_COURSES_KEY);
      },
    }),
  useUpdateCourse: () =>
    useMutation(CourseApi.updateCourse, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_COURSE_KEY);
        queryClient.invalidateQueries(GET_USER_COURSES_KEY);
      },
    }),
};
