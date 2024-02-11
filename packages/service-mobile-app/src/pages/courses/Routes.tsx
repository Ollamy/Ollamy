import { Route, Routes } from "react-router-native";
import CourseDashboard from "src/pages/courses/dashboard";
import SectionDashboard from "src/pages/courses/dashboard/section";
import JoinCourse from "src/pages/courses/joinCourse";

const CourseRouter = () => {
  return <Routes>
    <Route path="join/:id" element={<JoinCourse />} />
    <Route path=":id" element={<CourseDashboard />} />
    <Route path=":id/section/:sectionId" element={<SectionDashboard />} />
  </Routes>
}

export default CourseRouter;