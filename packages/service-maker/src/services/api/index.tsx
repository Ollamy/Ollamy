import { answerActions } from "./routes/answer";
import { courseActions } from "./routes/course";
import { lessonActions } from "./routes/lesson";
import { questionActions } from "./routes/question";
import { sectionActions } from "./routes/section";
import { userActions } from "./routes/user";

const api = {
  user: userActions,
  course: courseActions,
  section: sectionActions,
  lesson: lessonActions,
  question: questionActions,
  answer: answerActions,
};

export default api;
