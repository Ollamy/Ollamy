import { useMutation } from 'react-query';
import { queryClient } from 'main';
import { LectureApi } from 'services/api/out';
import { GET_LESSON_LECTURES_KEY } from 'services/api/routes/lesson';

const GET_LECTURE_KEY = 'getLectureKey';

export const lectureActions = {
  useCreateLecture: () =>
    useMutation(LectureApi.createLecture, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_LECTURES_KEY);
      },
    }),
  useUpdateLecture: () =>
    useMutation(LectureApi.updateLecture, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LECTURE_KEY);
        queryClient.invalidateQueries(GET_LESSON_LECTURES_KEY);
      },
    }),
  useRemoveLecture: () =>
    useMutation(LectureApi.deleteLecture, {
      onSuccess: () => {
        queryClient.invalidateQueries(GET_LESSON_LECTURES_KEY);
        queryClient.invalidateQueries(GET_LECTURE_KEY);
      },
    }),
};
