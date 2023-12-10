import { courseActions } from "./routes/course";
import { sectionActions } from "./routes/section";
import { userActions } from "./routes/user";

const api = {
  user: userActions,
  course: courseActions,
  section: sectionActions,
};

export default api;
