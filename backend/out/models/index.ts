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
    Id: string;
    /**
     * 
     * @type {string}
     * @memberof ChapterModel
     */
    SectionId: string;
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
    Id: string;
    /**
     * 
     * @type {string}
     * @memberof CourseModel
     */
    OwnerId: string;
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
 * @interface CreateChapterModel
 */
export interface CreateChapterModel {
    /**
     * 
     * @type {string}
     * @memberof CreateChapterModel
     */
    SectionId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateChapterModel
     */
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateChapterModel
     */
    Description: string;
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
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateCourseModel
     */
    Description: string;
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
    ChapterId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateLessonModel
     */
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateLessonModel
     */
    Description: string;
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
    LessonId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    Description: string;
    /**
     * 
     * @type {string}
     * @memberof CreateQuestionModel
     */
    Data: string;
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
    CourseId: string;
    /**
     * 
     * @type {string}
     * @memberof CreateSectionModel
     */
    Title: string;
    /**
     * 
     * @type {string}
     * @memberof CreateSectionModel
     */
    Description: string;
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
    Firstname: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserModel
     */
    Lastname: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserModel
     */
    Email: string;
    /**
     * 
     * @type {string}
     * @memberof CreateUserModel
     */
    Password: string;
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
    Id: string;
    /**
     * 
     * @type {string}
     * @memberof LessonModel
     */
    ChapterId: string;
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
    Id: string;
    /**
     * 
     * @type {string}
     * @memberof QuestionModel
     */
    LessonId: string;
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
 * @interface SectionModel
 */
export interface SectionModel {
    /**
     * 
     * @type {string}
     * @memberof SectionModel
     */
    Id: string;
    /**
     * 
     * @type {string}
     * @memberof SectionModel
     */
    CourseId: string;
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
    Firstname: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserModel
     */
    Lastname: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserModel
     */
    Email: string;
    /**
     * 
     * @type {string}
     * @memberof UpdateUserModel
     */
    Password: string;
}
