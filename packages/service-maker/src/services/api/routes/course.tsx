import { UseQueryOptions, useMutation, useQuery } from 'react-query';
import { CourseApi, CourseModel, GetCourseRequest, GetCourseSectionsRequest, SectionModel } from 'src/services/api/out';
import { queryClient } from 'src/main';
import { GET_USER_COURSES_KEY } from 'src/services/api/routes/user';

const GET_COURSE_KEY = 'getCourse';
export const GET_COURSE_SECTIONS_KEY = 'getCourseSections';

export const courseActions = {
  useCourse: (requestParameters: GetCourseRequest, config?: UseQueryOptions<CourseModel>) =>
    useQuery({
      queryKey: GET_COURSE_KEY,
      queryFn: () => CourseApi.getCourse(requestParameters),
      ...config,
    }),
  useCourseSection: (requestParameters: GetCourseSectionsRequest, config?: UseQueryOptions<Array<SectionModel>>) =>
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
