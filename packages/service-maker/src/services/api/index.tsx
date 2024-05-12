import { userActions } from 'services/api/routes/user';
import { courseActions } from 'services/api/routes/course';
import { sectionActions } from 'services/api/routes/section';
import { lessonActions } from 'services/api/routes/lesson';
import { questionActions } from 'services/api/routes/question';
import { answerActions } from 'services/api/routes/answer';

const api = {
  user: userActions,
  course: courseActions,
  section: sectionActions,
  lesson: lessonActions,
  question: questionActions,
  answer: answerActions,
};

export default api;
