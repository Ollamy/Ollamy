import { courseActions } from "./routes/course";
import { userActions } from "./routes/user";

const api = {
  user: userActions,
  course: courseActions,
};

export default api;
