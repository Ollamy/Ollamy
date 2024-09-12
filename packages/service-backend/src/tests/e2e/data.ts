import { v4 as uuidv4 } from 'uuid';
import { UserService } from 'user/user.service';
import { PlatformEnum } from 'user/user.dto';
import {
  PermissionCourse,
  PermissionLesson,
  PermissionSection,
  PermissionUser,
  Role,
  Status,
} from '@prisma/client';
import { UpdateOrderModel } from 'order/order.dto';

const password = '1234aaBB@';
const hashed_password = new UserService().hashPassword(password);
const courseUpdatedTitle = 'new tile';
const sectionUpdatedTitle = 'new tile';
const lessonUpdatedTitle = 'new tile';

const userData = {
  firstname: 'name',
  lastname: 'lastname',
  email: 'testeeeeeee@test.test',
  password: hashed_password,
  platform: PlatformEnum.MAKER,
};

const userId = uuidv4();

const returnData = {
  ...userData,
  id: userId,
  firstName: 'name',
  communities_id: [''],
};

const courseData = {
  id: uuidv4(),
  owner_id: userId,
  title: 'course name',
  description: 'course description',
  picture_id: undefined,
};

const returnCourseData = {
  ...courseData,
  id: courseData.id,
  title: courseUpdatedTitle,
};

const sectionsData = {
  id: uuidv4(),
  title: 'section title',
  description: 'section description',
  course_id: courseData.id,
  order: 'a0',
};

const createSectionData = {
  id: uuidv4(),
  title: 'section title',
  description: 'section description',
  courseId: courseData.id,
};

const sectionsArray = [sectionsData];

const hpData = {
  hp: 100,
};

const userToCourseData = {
  id: uuidv4(),
  user_id: userId,
  course_id: courseData.id,
  hp: 100,
  role: Role.OWNER,
  permission_user: [PermissionUser.ADMIN],
  permission_course: [PermissionCourse.ADMIN],
  permission_section: [PermissionSection.WRITE],
  permission_lesson: [PermissionLesson.WRITE],
  status: Status.COMPLETED,
  created_at: new Date(),
  updated_at: new Date(),
  role_user: Role.OWNER,
  score: 100,
};

const returnSectionData = {
  ...sectionsData,
  id: sectionsData.id,
  title: sectionUpdatedTitle,
};

const lessonData = {
  id: uuidv4(),
  title: 'lesson title',
  description: 'lesson description',
  section_id: sectionsData.id,
  order: 'a0',
  UserToLesson: [{ status: Status.COMPLETED }],
};

const lessonArray = [lessonData];

const returnLessonData = {
  ...lessonData,
  id: lessonData.id,
  title: lessonUpdatedTitle,
};

const createLessonData = {
  id: uuidv4(),
  title: 'lesson title',
  description: 'lesson description',
  sectionId: sectionsData.id,
};

const orderUpdate: UpdateOrderModel = {
  after: 'a0',
  before: 'a1',
  origin: uuidv4(),
};

const returnUserToSection = {
  id: uuidv4(),
  user_id: userId,
  section_id: sectionsData.id,
  status: Status.COMPLETED,
  created_at: new Date(),
  updated_at: new Date(),
  score: 100,
};

export {
  password,
  hashed_password,
  courseUpdatedTitle,
  userData,
  userId,
  returnData,
  courseData,
  returnCourseData,
  sectionsArray,
  sectionsData,
  hpData,
  userToCourseData,
  createSectionData,
  sectionUpdatedTitle,
  lessonUpdatedTitle,
  returnSectionData,
  lessonArray,
  lessonData,
  returnLessonData,
  createLessonData,
  orderUpdate,
  returnUserToSection,
};
