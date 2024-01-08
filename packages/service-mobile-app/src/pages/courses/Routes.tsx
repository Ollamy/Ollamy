import { Text } from "native-base";
import { Route, Routes } from "react-router-native";
import CourseDashboard from "src/pages/courses/dashboard";
import JoinCourse from "src/pages/courses/joinCourse";

const CourseRouter = () => {
  return <Routes>
    <Route path="join/:id" element={<JoinCourse />} />
    <Route path=":id" element={<CourseDashboard />} />
  </Routes>
}

export default CourseRouter;