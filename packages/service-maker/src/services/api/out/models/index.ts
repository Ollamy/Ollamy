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
    /**
     * 
     * @type {number}
     * @memberof AnswerModel
     */
    order: number;
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
 * @interface CourseSectionModel
 */
export interface CourseSectionModel {
    /**
     * 
     * @type {string}
     * @memberof CourseSectionModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof CourseSectionModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CourseSectionModel
     */
    description: string;
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
    picture?: string;
}
/**
 * 
 * @export
 * @interface CreateLectureModel
 */
export interface CreateLectureModel {
    /**
     * Lesson ID
     * @type {string}
     * @memberof CreateLectureModel
     */
    lessonId: string;
    /**
     * Lecture data
     * @type {string}
     * @memberof CreateLectureModel
     */
    data: string;
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
    sectionId: string;
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
     * The unique identifier of the lesson
     * @type {string}
     * @memberof CreateQuestionModel
     */
    lessonId: string;
    /**
     * The title of the question
     * @type {string}
     * @memberof CreateQuestionModel
     */
    title: string;
    /**
     * The description of the question
     * @type {string}
     * @memberof CreateQuestionModel
     */
    description: string;
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
    picture?: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    difficulty?: string;
    /**
     * 
     * @type {number}
     * @memberof CreateQuestionModel
     */
    points?: number;
    /**
     * The unique identifier of the trusted answer
     * @type {string}
     * @memberof CreateQuestionModel
     */
    trustAnswerId?: string;
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
     * The first name of the user
     * @type {string}
     * @memberof CreateUserModel
     */
    firstname: string;
    /**
     * The last name of the user
     * @type {string}
     * @memberof CreateUserModel
     */
    lastname: string;
    /**
     * The email address of the user
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
 * @interface GetCourseRequest
 */
export interface GetCourseRequest {
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    ownerId: string;
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    picture: string;
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    lastLessonId: string;
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    lastSectionId: string;
}
/**
 * 
 * @export
 * @interface GetQuestionModel
 */
export interface GetQuestionModel {
    /**
     * The lesson id of the question
     * @type {string}
     * @memberof GetQuestionModel
     */
    lessonId: string;
    /**
     * The title of the question
     * @type {string}
     * @memberof GetQuestionModel
     */
    title: string;
    /**
     * The description of the question
     * @type {string}
     * @memberof GetQuestionModel
     */
    description: string;
    /**
     * The type of answer for the question
     * @type {string}
     * @memberof GetQuestionModel
     */
    typeAnswer: string;
    /**
     * The type of question
     * @type {string}
     * @memberof GetQuestionModel
     */
    typeQuestion: string;
    /**
     * The unique identifier of the picture
     * @type {string}
     * @memberof GetQuestionModel
     */
    pictureId?: string;
    /**
     * The difficulty level of the question
     * @type {string}
     * @memberof GetQuestionModel
     */
    difficulty?: string;
    /**
     * The order of the question
     * @type {string}
     * @memberof GetQuestionModel
     */
    order: string;
    /**
     * The points for the question
     * @type {number}
     * @memberof GetQuestionModel
     */
    points?: number;
}
/**
 * 
 * @export
 * @interface GetUserModel
 */
export interface GetUserModel {
    /**
     * The first name of the user
     * @type {string}
     * @memberof GetUserModel
     */
    firstname: string;
    /**
     * The last name of the user
     * @type {string}
     * @memberof GetUserModel
     */
    lastname: string;
    /**
     * The email address of the user
     * @type {string}
     * @memberof GetUserModel
     */
    email: string;
}
/**
 * 
 * @export
 * @interface GetUserScoreModel
 */
export interface GetUserScoreModel {
    /**
     * The unique identifier of the user
     * @type {string}
     * @memberof GetUserScoreModel
     */
    userId: string;
    /**
     * The score of the user
     * @type {number}
     * @memberof GetUserScoreModel
     */
    score: number;
}
/**
 * 
 * @export
 * @interface GetUsersBadges
 */
export interface GetUsersBadges {
    /**
     * 
     * @type {Array<string>}
     * @memberof GetUsersBadges
     */
    badges: Array<string>;
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
 * @interface IdLectureModel
 */
export interface IdLectureModel {
    /**
     * ID of the lecture
     * @type {string}
     * @memberof IdLectureModel
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
     * The unique identifier of the question
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
 * @interface LectureIdResponse
 */
export interface LectureIdResponse {
    /**
     * ID of the created/updated lecture
     * @type {string}
     * @memberof LectureIdResponse
     */
    id: string;
}
/**
 * 
 * @export
 * @interface LectureModel
 */
export interface LectureModel {
    /**
     * Lesson ID
     * @type {string}
     * @memberof LectureModel
     */
    lessonId: string;
    /**
     * Lecture data
     * @type {string}
     * @memberof LectureModel
     */
    data: string;
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
 * @interface LessonLectureModel
 */
export interface LessonLectureModel {
    /**
     * The unique identifier of the lecture
     * @type {string}
     * @memberof LessonLectureModel
     */
    id: string;
    /**
     * The data of the lecture
     * @type {string}
     * @memberof LessonLectureModel
     */
    data: string;
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
     * The email address of the user
     * @type {string}
     * @memberof LoginUserModel
     */
    email: string;
    /**
     * The password of the user
     * @type {string}
     * @memberof LoginUserModel
     */
    password: string;
}
/**
 * 
 * @export
 * @interface QuestionAnswerModel
 */
export interface QuestionAnswerModel {
    /**
     * 
     * @type {string}
     * @memberof QuestionAnswerModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionAnswerModel
     */
    data: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionAnswerModel
     */
    picture: string;
    /**
     * 
     * @type {number}
     * @memberof QuestionAnswerModel
     */
    order: number;
}
/**
 * 
 * @export
 * @interface QuestionIdResponse
 */
export interface QuestionIdResponse {
    /**
     * The unique identifier of the question
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
     * The unique identifier of the question
     * @type {string}
     * @memberof QuestionModel
     */
    id: string;
    /**
     * The title of the question
     * @type {string}
     * @memberof QuestionModel
     */
    title: string;
    /**
     * The description of the question
     * @type {string}
     * @memberof QuestionModel
     */
    description: string;
    /**
     * The type of answer for the question
     * @type {string}
     * @memberof QuestionModel
     */
    typeAnswer: string;
    /**
     * The type of question
     * @type {string}
     * @memberof QuestionModel
     */
    typeQuestion: string;
    /**
     * The unique identifier of the picture
     * @type {string}
     * @memberof QuestionModel
     */
    pictureId?: string;
    /**
     * The difficulty level of the question
     * @type {string}
     * @memberof QuestionModel
     */
    difficulty?: string;
    /**
     * The order of the question
     * @type {string}
     * @memberof QuestionModel
     */
    order: string;
    /**
     * The points for the question
     * @type {number}
     * @memberof QuestionModel
     */
    points?: number;
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
 * @interface SuccessBody
 */
export interface SuccessBody {
    /**
     * Result of the request
     * @type {boolean}
     * @memberof SuccessBody
     */
    success: boolean;
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
 * @interface UpdateAnswerOrderModel
 */
export interface UpdateAnswerOrderModel {
    /**
     * The order after the current order
     * @type {string}
     * @memberof UpdateAnswerOrderModel
     */
    after?: string;
    /**
     * The order before the current order
     * @type {string}
     * @memberof UpdateAnswerOrderModel
     */
    before?: string;
    /**
     * The origin of the answer
     * @type {string}
     * @memberof UpdateAnswerOrderModel
     */
    origin: string;
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
    ownerId?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    picture?: string;
}
/**
 * 
 * @export
 * @interface UpdateLectureModel
 */
export interface UpdateLectureModel {
    /**
     * Lesson ID
     * @type {string}
     * @memberof UpdateLectureModel
     */
    lessonId: string;
    /**
     * Updated lecture data
     * @type {string}
     * @memberof UpdateLectureModel
     */
    data: string;
}
/**
 * 
 * @export
 * @interface UpdateQuestionModel
 */
export interface UpdateQuestionModel {
    /**
     * The unique identifier of the lesson
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    lessonId?: string;
    /**
     * The title of the question
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    title?: string;
    /**
     * The description of the question
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    description?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    typeAnswer?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    typeQuestion?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    picture?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    difficulty?: string;
    /**
     * 
     * @type {number}
     * @memberof UpdateQuestionModel
     */
    points?: number;
    /**
     * The unique identifier of the trusted answer
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    trustAnswerId?: string;
}
/**
 * 
 * @export
 * @interface UpdateQuestionOrderModel
 */
export interface UpdateQuestionOrderModel {
    /**
     * The order after the current order
     * @type {string}
     * @memberof UpdateQuestionOrderModel
     */
    after?: string;
    /**
     * The order before the current order
     * @type {string}
     * @memberof UpdateQuestionOrderModel
     */
    before?: string;
    /**
     * The origin of the question
     * @type {string}
     * @memberof UpdateQuestionOrderModel
     */
    origin: string;
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
    courseId?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSectionModel
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSectionModel
     */
    description?: string;
}
/**
 * 
 * @export
 * @interface UpdateUserModel
 */
export interface UpdateUserModel {
    /**
     * The first name of the user
     * @type {string}
     * @memberof UpdateUserModel
     */
    firstname?: string;
    /**
     * The last name of the user
     * @type {string}
     * @memberof UpdateUserModel
     */
    lastname?: string;
    /**
     * The email address of the user
     * @type {string}
     * @memberof UpdateUserModel
     */
    email?: string;
    /**
     * The password of the user
     * @type {string}
     * @memberof UpdateUserModel
     */
    password?: string;
}
/**
 * 
 * @export
 * @interface UserCourseHp
 */
export interface UserCourseHp {
    /**
     * 
     * @type {number}
     * @memberof UserCourseHp
     */
    hp: number;
    /**
     * 
     * @type {string}
     * @memberof UserCourseHp
     */
    timer: string;
}
/**
 * 
 * @export
 * @interface UserCourses
 */
export interface UserCourses {
    /**
     * The unique identifier of the course
     * @type {string}
     * @memberof UserCourses
     */
    id: string;
    /**
     * The title of the course
     * @type {string}
     * @memberof UserCourses
     */
    title: string;
    /**
     * The description of the course
     * @type {string}
     * @memberof UserCourses
     */
    description: string;
    /**
     * The URL of the picture representing the course
     * @type {string}
     * @memberof UserCourses
     */
    pictureId: string;
    /**
     * Indicates if the user owns this course
     * @type {boolean}
     * @memberof UserCourses
     */
    owner: boolean;
    /**
     * The unique identifier of the last lesson
     * @type {string}
     * @memberof UserCourses
     */
    lastLessonId: string;
    /**
     * The unique identifier of the last section
     * @type {string}
     * @memberof UserCourses
     */
    lastSectionId: string;
}
/**
 * 
 * @export
 * @interface UserCoursesResponse
 */
export interface UserCoursesResponse {
    /**
     * List of courses associated with the user
     * @type {Array<UserCourses>}
     * @memberof UserCoursesResponse
     */
    courses: Array<UserCourses>;
}
/**
 * 
 * @export
 * @interface UserIdResponse
 */
export interface UserIdResponse {
    /**
     * The unique identifier of the user
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
     * Indicates if the operation was successful or not
     * @type {boolean}
     * @memberof UserTrueResponse
     */
    success: boolean;
}
/**
 * 
 * @export
 * @interface ValidateAnswerModel
 */
export interface ValidateAnswerModel {
    /**
     * The unique identifier of the question
     * @type {string}
     * @memberof ValidateAnswerModel
     */
    questionId: string;
    /**
     * The unique identifier of the answer
     * @type {string}
     * @memberof ValidateAnswerModel
     */
    answerId: string;
}
/**
 * 
 * @export
 * @interface ValidateAnswerResponse
 */
export interface ValidateAnswerResponse {
    /**
     * Indicates if the answer is true or false
     * @type {boolean}
     * @memberof ValidateAnswerResponse
     */
    success: boolean;
    /**
     * The unique identifier of the true answer
     * @type {string}
     * @memberof ValidateAnswerResponse
     */
    answer: string;
    /**
     * Indicates if it is the last question or not
     * @type {boolean}
     * @memberof ValidateAnswerResponse
     */
    end: boolean;
    /**
     * The unique identifier of the next question if it is not the last one
     * @type {string}
     * @memberof ValidateAnswerResponse
     */
    nextQuestionId?: string;
    /**
     * Points scored in the last question
     * @type {number}
     * @memberof ValidateAnswerResponse
     */
    points?: number;
    /**
     * User's remaining hp
     * @type {number}
     * @memberof ValidateAnswerResponse
     */
    hp?: number;
}
