/* tslint:disable */
/* eslint-disable */
/**
 * 
 * @export
 * @interface ChapterModel
 */
export interface ChapterModel {
    /**
     * 
     * @type {string}
     * @memberof ChapterModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ChapterModel
     */
    sectionId: string;
    /**
     * 
     * @type {string}
     * @memberof ChapterModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof ChapterModel
     */
    description: string;
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
}
/**
 * 
 * @export
 * @interface CreateChapterModel
 */
export interface CreateChapterModel {
    /**
     * 
     * @type {string}
     * @memberof CreateChapterModel
     */
    sectionId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateChapterModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateChapterModel
     */
    description: string;
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
    chapter_id: string;
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
 * @interface IdChapterModel
 */
export interface IdChapterModel {
    /**
     * 
     * @type {string}
     * @memberof IdChapterModel
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
    chapterId: string;
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
    data: string;
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
 * @interface UpdateChapterModel
 */
export interface UpdateChapterModel {
    /**
     * 
     * @type {string}
     * @memberof UpdateChapterModel
     */
    sectionId: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateChapterModel
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateChapterModel
     */
    description: string;
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
    data: string;
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
