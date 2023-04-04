import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CourseModel,
  CreateCourseModel,
  IdCourseModel,
  UpdateCourseModel,
} from './course.dto';
import { SectionModel } from 'section/section.dto';
import prisma from 'client';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  async postCourse(courseData: CreateCourseModel, ctx: any): Promise<string> {
    try {
      const courseDb = await prisma.course.create({
        data: {
          owner_id: ctx.__user.id,
          title: courseData.title,
          description: courseData.description,
        },
      });

      if (!courseDb) {
        Logger.error('Failed to create course !');
        throw new NotFoundException('Failed to create course !');
      }
      return `Course created with id ${courseDb.id}`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course not created !');
    }
  }

  async deleteCourse(courseData: IdCourseModel): Promise<string> {
    try {
      const courseDb = await prisma.course.delete({
        where: {
          id: courseData.id,
        },
      });

      if (!courseDb) {
        Logger.error('Course does not exists !');
        throw new NotFoundException('Course does not exists !');
      }

      return `Course's ${courseData.id} has been deleted.`;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Course already removed !');
      } else {
        throw new ConflictException('Course not created !');
      }
    }
  }

  async getCourse(CourseId: string): Promise<CourseModel> {
    try {
      const courseDb = await prisma.course.findFirst({
        where: {
          id: CourseId,
        },
      });

      if (!courseDb) {
        Logger.error('Course does not exists !');
        throw new ConflictException('Course does not exists !');
      }

      return {
        id: courseDb.id,
        ownerId: courseDb.owner_id,
        title: courseDb.title,
        description: courseDb.description,
      } as CourseModel;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course not deleted !');
    }
  }

  async updateCourse(
    CourseId: string,
    courseData: UpdateCourseModel,
  ): Promise<string> {
    try {
      const courseDb = await prisma.course.update({
        where: {
          id: CourseId,
        },
        data: {
          owner_id: courseData.ownerId,
          title: courseData.title,
          description: courseData.description,
        },
      });

      if (!courseDb) {
        Logger.error('Course does not exists !');
        throw new ConflictException('Course does not exists !');
      }

      return `Course with id ${CourseId} has been updated`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course not updated !');
    }
  }

  async getCourseSections(CourseId: string): Promise<SectionModel[]> {
    try {
      const courseSectionsDb = await prisma.section.findMany({
        where: {
          course_id: CourseId,
        },
      });

      if (!courseSectionsDb) {
        Logger.error('No sections for this course !');
        throw new NotFoundException('No sections for this course !');
      }

      return courseSectionsDb.map((lesson) => {
        return {
          id: lesson.id,
          courseId: lesson.course_id,
          title: lesson.title,
          description: lesson.description,
        };
      }) as SectionModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Sections not found !');
    }
  }
}