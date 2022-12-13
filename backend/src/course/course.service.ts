import { Logger, ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CourseModel } from './course.dto';
import prisma from 'client';

@Injectable()
export class CourseService {

  async postCourse(courseData: CourseModel): Promise<string> {
    try {
      const courseDb = await prisma.course.create({
        data: {
            owner_id: courseData.Owner_id,
            title: courseData.Title,
            description: courseData.Description,
        },
      });
      courseData.Id = courseDb.id;
      return "Course created";
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course not created !');
    }
  }

  async deleteCourse(courseData: CourseModel): Promise<string> {
    try {
        const courseDb = await prisma.course.delete({
            where: {
                id: courseData.Id,
              },
        });
        return "Course deleted"
    } catch (error) {
        Logger.error(error);
      throw new ConflictException('Course not deleted !');
    }
  }
}
