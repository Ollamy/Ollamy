import { answerActions } from 'services/api/routes/answer';
import { courseActions } from 'services/api/routes/course';
import { lectureActions } from 'services/api/routes/lecture';
import { lessonActions } from 'services/api/routes/lesson';
import { questionActions } from 'services/api/routes/question';
import { sectionActions } from 'services/api/routes/section';
import { userActions } from 'services/api/routes/user';

const api = {
  user: userActions,
  course: courseActions,
  section: sectionActions,
  lesson: lessonActions,
  question: questionActions,
  answer: answerActions,
  lecture: lectureActions,
};

export default api;
