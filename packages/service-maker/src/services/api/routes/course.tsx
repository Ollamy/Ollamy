import type { UseQueryOptions } from 'react-query';
import { useMutation, useQuery } from 'react-query';
import { queryClient } from 'main';
import type {
  CourseSectionModel,
  GetCourseOperationRequest,
  GetCourseRequest,
  GetCourseSectionsRequest,
} from 'services/api/out';
import { CourseApi } from 'services/api/out';
import { GET_USER_COURSES_KEY } from 'services/api/routes/user';

const GET_COURSE_KEY = 'getCourse';
export const GET_COURSE_SECTIONS_KEY = 'getCourseSections';

export const courseActions = {
  useCourse: (
    requestParameters: GetCourseOperationRequest,
    config?: UseQueryOptions<GetCourseRequest>,
  ) =>
    useQuery({
      queryKey: GET_COURSE_KEY,
      queryFn: () => CourseApi.getCourse(requestParameters),
      ...config,
    }),
  useGetCourseSection: (
    requestParameters: GetCourseSectionsRequest,
    config?: UseQueryOptions<Array<CourseSectionModel>>,
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
