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

const GET_COURSE_KEY = 'getCourseKey';
export const GET_COURSE_SECTIONS_KEY = 'getCourseSectionsKey';

export const courseActions = {
  useCourse: (
    requestParameters: GetCourseOperationRequest,
    config?: UseQueryOptions<GetCourseRequest>,
  ) =>
    useQuery({
      queryKey: [GET_COURSE_KEY, requestParameters.id],
      queryFn: () => CourseApi.getCourse(requestParameters),
      ...config,
    }),
  useGetCourseSections: (
    requestParameters: GetCourseSectionsRequest,
    config?: UseQueryOptions<Array<CourseSectionModel>>,
  ) =>
    useQuery({
      queryKey: [GET_COURSE_SECTIONS_KEY, requestParameters.id],
      queryFn: () => CourseApi.getCourseSections(requestParameters),
      ...config,
    }),
  useCreateCourse: () =>
    useMutation(CourseApi.postCourse, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_USER_COURSES_KEY);
      },
    }),
  useUpdateCourse: () =>
    useMutation(CourseApi.updateCourse, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_USER_COURSES_KEY);
        queryClient.invalidateQueries(GET_COURSE_KEY);
      },
    }),
  useRemoveCourse: () =>
    useMutation(CourseApi.deleteCourse, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_USER_COURSES_KEY);
      },
    }),
  useGenerateShareCode: () => useMutation(CourseApi.generateCodeforCourse),
};
