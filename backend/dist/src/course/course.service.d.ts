import { CourseModel, CreateCourseModel, IdCourseModel, UpdateCourseModel } from './course.dto';
import { SectionModel } from 'section/section.dto';
export declare class CourseService {
    postCourse(courseData: CreateCourseModel, ctx: any): Promise<string>;
    deleteCourse(courseId: IdCourseModel): Promise<string>;
    getCourse(CourseId: string): Promise<CourseModel>;
    updateCourse(CourseId: string, courseData: UpdateCourseModel): Promise<string>;
    getCourseSections(CourseId: string): Promise<SectionModel[]>;
}
