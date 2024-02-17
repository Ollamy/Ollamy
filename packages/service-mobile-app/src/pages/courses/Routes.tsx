import { Route, Routes } from 'react-router-native';
import CourseDashboard from 'src/pages/courses/dashboard/CourseDashboard/CourseDashboard';
import SectionDashboard from 'src/pages/courses/dashboard/SectionDashboard/SectionDashboard';
import JoinCourse from 'src/pages/courses/JoinCourse/JoinCourse';

import Lesson from './dashboard/lesson';

function CourseRouter() {
  return (
    <Routes>
      <Route path="join/:id" element={<JoinCourse />} />
      <Route path=":id" element={<CourseDashboard />} />
      <Route path=":id/section/:sectionId" element={<SectionDashboard />} />
      <Route path=":id/section/:sectionId/lesson/:lessonId" element={<Lesson />} />
    </Routes>
  );
}

export default CourseRouter;
