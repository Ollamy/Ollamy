export interface ChapterModel {
    id: string;
    sectionId: string;
    title: string;
    description: string;
}
export interface CourseModel {
    id: string;
    ownerId: string;
    title: string;
    description: string;
}
export interface CreateChapterModel {
    sectionId: string;
    title: string;
    description: string;
}
export interface CreateCourseModel {
    title: string;
    description: string;
}
export interface CreateLessonModel {
    chapterId: string;
    title: string;
    description: string;
}
export interface CreateQuestionModel {
    lessonId: string;
    title: string;
    description: string;
    data: string;
    typeAnswer: string;
    typeQuestion: string;
}
export interface CreateSectionModel {
    courseId: string;
    title: string;
    description: string;
}
export interface CreateUserModel {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}
export interface IdChapterModel {
    id: string;
}
export interface IdCourseModel {
    id: string;
}
export interface IdLessonModel {
    id: string;
}
export interface IdQuestionModel {
    id: string;
}
export interface IdSectionModel {
    id: string;
}
export interface LessonModel {
    id: string;
    chapterId: string;
    title: string;
    description: string;
}
export interface LoginUserModel {
    email: string;
    password: string;
}
export interface QuestionModel {
    id: string;
    lessonId: string;
    title: string;
    description: string;
    data: string;
}
export interface SectionModel {
    id: string;
    courseId: string;
    title: string;
    description: string;
}
export interface UpdateChapterModel {
    sectionId: string;
    title: string;
    description: string;
}
export interface UpdateCourseModel {
    ownerId: string;
    title: string;
    description: string;
}
export interface UpdateQuestionModel {
    lessonId: string;
    title: string;
    description: string;
    data: string;
}
export interface UpdateSectionModel {
    courseId: string;
    title: string;
    description: string;
}
export interface UpdateUserModel {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}
