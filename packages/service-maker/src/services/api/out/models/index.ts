/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface AnswerIdResponse
 */
export interface AnswerIdResponse {
    /**
     * 
     * @type {string}
     * @memberof AnswerIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface AnswerModel
 */
export interface AnswerModel {
    /**
     * 
     * @type {string}
     * @memberof AnswerModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof AnswerModel
     */
    questionId: string;
    /**
     * 
     * @type {string}
     * @memberof AnswerModel
     */
    data: string;
    /**
     * 
     * @type {string}
     * @memberof AnswerModel
     */
    picture: string;
}
/**
 * 
 * @export
 * @interface CourseIdResponse
 */
export interface CourseIdResponse {
    /**
     * 
     * @type {string}
     * @memberof CourseIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface CourseModel
 */
export interface CourseModel {
    /**
     * 
     * @type {string}
     * @memberof CourseModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof CourseModel
     */
    ownerId: string;
    /**
     * 
     * @type {string}
     * @memberof CourseModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CourseModel
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof CourseModel
     */
    picture: string;
}
/**
 * 
 * @export
 * @interface CourseTrueResponse
 */
export interface CourseTrueResponse {
    /**
     * 
     * @type {boolean}
     * @memberof CourseTrueResponse
     */
    success: boolean;
}
/**
 * 
 * @export
 * @interface CreateAnswerModel
 */
export interface CreateAnswerModel {
    /**
     * 
     * @type {string}
     * @memberof CreateAnswerModel
     */
    questionId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAnswerModel
     */
    data: string;
    /**
     * 
     * @type {string}
     * @memberof CreateAnswerModel
     */
    picture: string;
}
/**
 * 
 * @export
 * @interface CreateCourseModel
 */
export interface CreateCourseModel {
    /**
     * 
     * @type {string}
     * @memberof CreateCourseModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCourseModel
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCourseModel
     */
    picture: string;
}
/**
 * 
 * @export
 * @interface CreateLessonModel
 */
export interface CreateLessonModel {
    /**
     * 
     * @type {string}
     * @memberof CreateLessonModel
     */
    section_id: string;
    /**
     * 
     * @type {string}
     * @memberof CreateLessonModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateLessonModel
     */
    description: string;
}
/**
 * 
 * @export
 * @interface CreateQuestionModel
 */
export interface CreateQuestionModel {
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    lessonId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    data: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    typeAnswer: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    typeQuestion: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    picture: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    difficulty: string;
}
/**
 * 
 * @export
 * @interface CreateSectionModel
 */
export interface CreateSectionModel {
    /**
     * 
     * @type {string}
     * @memberof CreateSectionModel
     */
    courseId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateSectionModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateSectionModel
     */
    description: string;
}
/**
 * 
 * @export
 * @interface CreateUserModel
 */
export interface CreateUserModel {
    /**
     * 
     * @type {string}
     * @memberof CreateUserModel
     */
    firstname: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserModel
     */
    lastname: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserModel
     */
    email: string;
    /**
     * Password must contain at least 8 characters, 2 numbers and 2 uppercase letters
     * @type {string}
     * @memberof CreateUserModel
     */
    password: string;
}
/**
 * 
 * @export
 * @interface GetUserModel
 */
export interface GetUserModel {
    /**
     * 
     * @type {string}
     * @memberof GetUserModel
     */
    firstname: string;
    /**
     * 
     * @type {string}
     * @memberof GetUserModel
     */
    lastname: string;
    /**
     * 
     * @type {string}
     * @memberof GetUserModel
     */
    email: string;
}
/**
 * 
 * @export
 * @interface IdAnswerModel
 */
export interface IdAnswerModel {
    /**
     * 
     * @type {string}
     * @memberof IdAnswerModel
     */
    id: string;
}
/**
 * 
 * @export
 * @interface IdCourseModel
 */
export interface IdCourseModel {
    /**
     * 
     * @type {string}
     * @memberof IdCourseModel
     */
    id: string;
}
/**
 * 
 * @export
 * @interface IdLessonModel
 */
export interface IdLessonModel {
    /**
     * 
     * @type {string}
     * @memberof IdLessonModel
     */
    id: string;
}
/**
 * 
 * @export
 * @interface IdQuestionModel
 */
export interface IdQuestionModel {
    /**
     * 
     * @type {string}
     * @memberof IdQuestionModel
     */
    id: string;
}
/**
 * 
 * @export
 * @interface IdSectionModel
 */
export interface IdSectionModel {
    /**
     * 
     * @type {string}
     * @memberof IdSectionModel
     */
    id: string;
}
/**
 * 
 * @export
 * @interface JoinLessonModel
 */
export interface JoinLessonModel {
    /**
     * 
     * @type {string}
     * @memberof JoinLessonModel
     */
    userId: string;
}
/**
 * 
 * @export
 * @interface LessonIdResponse
 */
export interface LessonIdResponse {
    /**
     * 
     * @type {string}
     * @memberof LessonIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface LessonModel
 */
export interface LessonModel {
    /**
     * 
     * @type {string}
     * @memberof LessonModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof LessonModel
     */
    sectionId: string;
    /**
     * 
     * @type {string}
     * @memberof LessonModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof LessonModel
     */
    description: string;
}
/**
 * 
 * @export
 * @interface LoginUserModel
 */
export interface LoginUserModel {
    /**
     * 
     * @type {string}
     * @memberof LoginUserModel
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof LoginUserModel
     */
    password: string;
}
/**
 * 
 * @export
 * @interface QuestionIdResponse
 */
export interface QuestionIdResponse {
    /**
     * 
     * @type {string}
     * @memberof QuestionIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface QuestionModel
 */
export interface QuestionModel {
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    lessonId: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    typeAnswer: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    typeQuestion: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    trustAnswerId: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    pictureId: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    difficulty: string;
}
/**
 * 
 * @export
 * @interface SectionIdResponse
 */
export interface SectionIdResponse {
    /**
     * 
     * @type {string}
     * @memberof SectionIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface SectionModel
 */
export interface SectionModel {
    /**
     * 
     * @type {string}
     * @memberof SectionModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof SectionModel
     */
    courseId: string;
    /**
     * 
     * @type {string}
     * @memberof SectionModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof SectionModel
     */
    description: string;
}
/**
 * 
 * @export
 * @interface UpdateAnswerModel
 */
export interface UpdateAnswerModel {
    /**
     * 
     * @type {string}
     * @memberof UpdateAnswerModel
     */
    questionId: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateAnswerModel
     */
    data: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateAnswerModel
     */
    picture: string;
}
/**
 * 
 * @export
 * @interface UpdateCourseModel
 */
export interface UpdateCourseModel {
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    ownerId: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    picture: string;
}
/**
 * 
 * @export
 * @interface UpdateQuestionModel
 */
export interface UpdateQuestionModel {
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    lessonId: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    picture: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateQuestionModel
     */
    points: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    difficulty: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    trustAnswerId: string;
}
/**
 * 
 * @export
 * @interface UpdateSectionModel
 */
export interface UpdateSectionModel {
    /**
     * 
     * @type {string}
     * @memberof UpdateSectionModel
     */
    courseId: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSectionModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSectionModel
     */
    description: string;
}
/**
 * 
 * @export
 * @interface UpdateUserModel
 */
export interface UpdateUserModel {
    /**
     * 
     * @type {string}
     * @memberof UpdateUserModel
     */
    firstname: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserModel
     */
    lastname: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserModel
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserModel
     */
    password: string;
}
/**
 * 
 * @export
 * @interface UserIdResponse
 */
export interface UserIdResponse {
    /**
     * 
     * @type {string}
     * @memberof UserIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface UserTrueResponse
 */
export interface UserTrueResponse {
    /**
     * 
     * @type {boolean}
     * @memberof UserTrueResponse
     */
    success: boolean;
}