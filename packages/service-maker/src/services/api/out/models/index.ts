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
    question_id: string;
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
 * @interface BetweenOrder
 */
export interface BetweenOrder {
    /**
     * 
     * @type {string}
     * @memberof BetweenOrder
     */
    before: string;
    /**
     * 
     * @type {string}
     * @memberof BetweenOrder
     */
    after: string;
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
    question_id: string;
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
 * @interface CreateLectureModel
 */
export interface CreateLectureModel {
    /**
     * Lesson ID
     * @type {string}
     * @memberof CreateLectureModel
     */
    lesson_id: string;
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
    lesson_id: string;
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
    type_answer: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    type_question: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    picture_id: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    video_id: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    audio_id: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    difficulty: string;
    /**
     * 
     * @type {BetweenOrder}
     * @memberof CreateQuestionModel
     */
    between: BetweenOrder;
    /**
     * 
     * @type {number}
     * @memberof CreateQuestionModel
     */
    points: number;
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
    course_id: string;
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
 * @interface CreateUser
 */
export interface CreateUser {
    /**
     * The first name of the user
     * @type {string}
     * @memberof CreateUser
     */
    firstname: string;
    /**
     * The last name of the user
     * @type {string}
     * @memberof CreateUser
     */
    lastname: string;
    /**
     * The email address of the user
     * @type {string}
     * @memberof CreateUser
     */
    email: string;
    /**
     * Password must contain at least 8 characters, 2 numbers, and 2 uppercase letters
     * @type {string}
     * @memberof CreateUser
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
    id: string;
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    owner_id: string;
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
    last_lesson_id: string;
    /**
     * 
     * @type {string}
     * @memberof GetCourseRequest
     */
    last_section_id: string;
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
    user_id: string;
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
    lesson_id: string;
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
    section_id: string;
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
 * @interface LoginUser
 */
export interface LoginUser {
    /**
     * The first name of the user
     * @type {string}
     * @memberof LoginUser
     */
    firstname: string;
    /**
     * The last name of the user
     * @type {string}
     * @memberof LoginUser
     */
    lastname: string;
    /**
     * The email address of the user
     * @type {string}
     * @memberof LoginUser
     */
    email: string;
    /**
     * The password of the user
     * @type {string}
     * @memberof LoginUser
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
    lesson_id: string;
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
    type_answer: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    type_question: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    trust_answer_id: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    picture_id: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    video_id: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    audio_id: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    difficulty: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    order: string;
    /**
     * 
     * @type {number}
     * @memberof QuestionModel
     */
    points: number;
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
    course_id: string;
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
    question_id: string;
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
    owner_id: string;
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
 * @interface UpdateLectureModel
 */
export interface UpdateLectureModel {
    /**
     * Lesson ID
     * @type {string}
     * @memberof UpdateLectureModel
     */
    lesson_id: string;
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
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    lesson_id: string;
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
    picture_id: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    video_id: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    audio_id: string;
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
    trust_answer_id: string;
}
/**
 * 
 * @export
 * @interface UpdateQuestionOrderModel
 */
export interface UpdateQuestionOrderModel {
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionOrderModel
     */
    after: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionOrderModel
     */
    before: string;
    /**
     * 
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
    course_id: string;
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
 * @interface UpdateUser
 */
export interface UpdateUser {
    /**
     * The first name of the user
     * @type {string}
     * @memberof UpdateUser
     */
    firstname: string;
    /**
     * The last name of the user
     * @type {string}
     * @memberof UpdateUser
     */
    lastname: string;
    /**
     * The email address of the user
     * @type {string}
     * @memberof UpdateUser
     */
    email: string;
    /**
     * The password of the user
     * @type {string}
     * @memberof UpdateUser
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
     * @type {number}
     * @memberof UserCourseHp
     */
    timer: number;
}
/**
 * 
 * @export
 * @interface UserCoursesResponse
 */
export interface UserCoursesResponse {
    /**
     * List of courses associated with the user
     * @type {Array<string>}
     * @memberof UserCoursesResponse
     */
    courses: Array<string>;
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
 * @interface UserModel
 */
export interface UserModel {
    /**
     * The first name of the user
     * @type {string}
     * @memberof UserModel
     */
    firstname: string;
    /**
     * The last name of the user
     * @type {string}
     * @memberof UserModel
     */
    lastname: string;
    /**
     * The email address of the user
     * @type {string}
     * @memberof UserModel
     */
    email: string;
    /**
     * The unique identifier of the user
     * @type {string}
     * @memberof UserModel
     */
    id: string;
    /**
     * The password of the user
     * @type {string}
     * @memberof UserModel
     */
    password: string;
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
     * 
     * @type {string}
     * @memberof ValidateAnswerModel
     */
    question_id: string;
    /**
     * 
     * @type {string}
     * @memberof ValidateAnswerModel
     */
    answer_id: string;
}
/**
 * 
 * @export
 * @interface ValidateAnswerResponse
 */
export interface ValidateAnswerResponse {
    /**
     * Boolean if the answer is true or false
     * @type {boolean}
     * @memberof ValidateAnswerResponse
     */
    success: boolean;
    /**
     * true answer id
     * @type {string}
     * @memberof ValidateAnswerResponse
     */
    answer: string;
    /**
     * Boolean if it is the last question or not
     * @type {boolean}
     * @memberof ValidateAnswerResponse
     */
    end: boolean;
    /**
     * Id of the next question if it is not the last one
     * @type {string}
     * @memberof ValidateAnswerResponse
     */
    nextQuestionId: string;
    /**
     * Points scored in the last question
     * @type {number}
     * @memberof ValidateAnswerResponse
     */
    points: number;
    /**
     * User's remaining hp
     * @type {number}
     * @memberof ValidateAnswerResponse
     */
    hp: number;
}
