import { Route, Routes } from 'react-router-native';
import Lesson from 'src/pages/courses/dashboard/lesson';
import LessonsList from 'src/pages/courses/dashboard/LessonsList/LessonsList';
import SectionsList from 'src/pages/courses/dashboard/SectionsList/SectionsList';
import FindCourse from 'src/pages/courses/FindCourse/FindCourse';
import JoinCourse from 'src/pages/courses/JoinCourse/JoinCourse';

function CourseRouter() {
  return (
    <Routes>
      <Route path={':id/join'} element={<JoinCourse />} />
      <Route path={'find'} element={<FindCourse />} />

      <Route path={':id'} element={<SectionsList />} />
      <Route path={':id/section/:sectionId'} element={<LessonsList />} />
      <Route path={':id/section/:sectionId/lesson/:lessonId'} element={<Lesson />} />
    </Routes>
  );
}

export default CourseRouter;
