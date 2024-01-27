import { courseActions } from 'src/services/api/routes/course';
import { sectionActions } from 'src/services/api/routes/section';
import { userActions } from 'src/services/api/routes/user';
import { lessonActions } from 'src/services/api/routes/lesson';
import { questionActions } from 'src/services/api/routes/question';
import { answerActions } from 'src/services/api/routes/answer';

const api = {
  user: userActions,
  course: courseActions,
  section: sectionActions,
  lesson: lessonActions,
  question: questionActions,
  answer: answerActions,
};

export default api;
