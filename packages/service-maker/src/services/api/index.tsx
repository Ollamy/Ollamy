import { courseActions } from "./routes/course";
import { lessonActions } from "./routes/lesson";
import { sectionActions } from "./routes/section";
import { userActions } from "./routes/user";

const api = {
  user: userActions,
  course: courseActions,
  section: sectionActions,
  lesson: lessonActions,
};

export default api;
