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
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof ChapterModel
     */
    Description: string;
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
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof CourseModel
     */
    Description: string;
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
    Id: string;
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
    Id: string;
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
    Id: string;
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
    Id: string;
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
    Id: string;
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
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof LessonModel
     */
    Description: string;
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
    Email: string;
    /**
     * 
     * @type {string}
     * @memberof LoginUserModel
     */
    Password: string;
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
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    Description: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    Data: string;
}
/**
 * 
 * @export
 * @interface RegisterUserModel
 */
export interface RegisterUserModel {
    /**
     * 
     * @type {string}
     * @memberof RegisterUserModel
     */
    Firstname: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserModel
     */
    Lastname: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserModel
     */
    Email: string;
    /**
     * 
     * @type {string}
     * @memberof RegisterUserModel
     */
    Password: string;
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
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof SectionModel
     */
    Description: string;
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
    SectionId: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateChapterModel
     */
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateChapterModel
     */
    Description: string;
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
    OwnerId: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateCourseModel
     */
    Description: string;
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
    LessonId: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    Description: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateQuestionModel
     */
    Data: string;
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
    CourseId: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSectionModel
     */
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateSectionModel
     */
    Description: string;
}
