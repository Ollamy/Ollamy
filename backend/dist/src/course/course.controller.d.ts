import { CourseModel, CreateCourseModel, IdCourseModel, UpdateCourseModel } from 'course/course.dto';
import { SectionModel } from 'section/section.dto';
import { CourseService } from 'course/course.service';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    postCourse(body: CreateCourseModel, ctx: any): Promise<string>;
    deleteCourse(body: IdCourseModel): Promise<string>;
    getCourse(id: string): Promise<CourseModel>;
    updateCourse(id: string, body: UpdateCourseModel): Promise<string>;
    getCourseSections(id: string): Promise<SectionModel[]>;
}
