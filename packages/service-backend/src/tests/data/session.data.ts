import { Status, UserSession } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { CreateSessionModel, GetSessionModel } from 'session/session.dto';
import { context } from './user.data';
import { mockLessonId } from './lesson.data';
import { questionId } from './question.data';
import { courseId } from './course.data';
import { sectionId } from './section.data';

export const mockSessionId = uuidv4();
export const mockSessionId2 = uuidv4();
export const correctAnswerId = uuidv4();

export const mockCreateSessionData: CreateSessionModel = {
  currentQuestionId: questionId,
  sessionId: mockSessionId,
};

export const mockUserSession: UserSession = {
  id: mockSessionId,
  created_at: new Date(),
  end_date: null,
  last_update: new Date(),
  course_id: courseId,
  section_id: sectionId,
  lesson_id: mockLessonId,
  user_id: context.__user.id,
  current_question_id: questionId,
  correct_answers: 3,
  total_questions: 3,
  status: Status.COMPLETED,
  preloaded_data: {},
};

export const mockGetUserSession: GetSessionModel = {
  currentQuestionId: questionId,
  correctAnswers: 3,
  totalQuestions: 3,
};
