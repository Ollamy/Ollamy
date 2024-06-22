import {
  Course,
  Lesson,
  Picture,
  Section,
  Status,
  Subscription,
  SubscriptionPlan,
  UserSubscription,
  UsertoCourse,
  UsertoLesson,
} from '@prisma/client';
import {
  CreateCourseModel,
  IdCourseModel,
  UpdateCourseModel,
} from 'course/course.dto';

import { context } from 'tests/data/user.data';
import { v4 as uuidv4 } from 'uuid';

// Data

export const courseId = uuidv4();

export const sharecode = 'sharecode-123';

export const createCourseData: CreateCourseModel = {
  title: 'title',
  description: 'desc',
  picture: 'data',
};

export const deleteCourseId: IdCourseModel = {
  id: courseId,
};

// Mock

export const mockUserId = {
  id: context.__user.id,
};

export const mockPictureDb: Picture = {
  id: uuidv4(),
  filename: 'data',
};

export const mockSubscriptionDb: Subscription = {
  plan: SubscriptionPlan.BASIC,
  slots: 5,
  price: 0,
};

export const mockUserSubscriptionDb: UserSubscription = {
  id: uuidv4(),
  user_id: context.__user.id,
  subscription_plan: SubscriptionPlan.BASIC,
  start_date: undefined,
  end_date: undefined,
};

export const mockCourseDb: Course = {
  id: courseId,
  owner_id: context.__user.id,
  title: createCourseData.title,
  description: createCourseData.description,
  picture_id: mockPictureDb.id,
};

export const mockCourseSlotsAvailableDb = {
  user: {
    UserSubscription: [
      {
        Subscription: {
          slots: 5,
        },
      },
    ],
  },
  _count: {
    userToCourse: 2,
  },
};

export const mockCourseSlotsFullDb = {
  user: {
    UserSubscription: [
      {
        Subscription: {
          slots: 5,
        },
      },
    ],
  },
  _count: {
    userlist: 6,
  },
};

export const mockUserToCourse: UsertoCourse = {
  id: uuidv4(),
  permission_course: [],
  permission_section: [],
  permission_lesson: [],
  course_id: '',
  user_id: context.__user.id,
  role_user: 'MEMBER',
  permission_user: [],
  score: 0,
  hp: 1,
  status: Status.IN_PROGRESS,
};

export const mockUpdateCourseData: UpdateCourseModel = {
  ownerId: context.__user.id,
  title: 'title',
  description: 'desc',
  picture: 'data',
};

export const mockSection1: Section = {
  id: uuidv4(),
  course_id: courseId,
  title: 'title',
  description: 'desc',
  order: 'a0',
};

export const mockSection2: Section = {
  id: uuidv4(),
  course_id: courseId,
  title: 'title',
  description: 'desc',
  order: 'a0',
};
