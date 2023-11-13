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
import { Course, Prisma, Section } from '@prisma/client';

@Injectable()
export class CourseService {
  async postCourse(courseData: CreateCourseModel, ctx: any): Promise<string> {
    try {
      const courseDb = await prisma.course.create({
        data: {
          owner_id: ctx.__user.id,
          ...courseData,
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

  async deleteCourse(courseId: IdCourseModel): Promise<string> {
    try {
      const courseDb = await prisma.course.delete({
        where: {
          ...courseId,
        },
      });

      if (!courseDb) {
        Logger.error('Course does not exists !');
        throw new NotFoundException('Course does not exists !');
      }

      return `Course's ${courseId.id} has been deleted.`;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Course already removed !');
      }
      throw new ConflictException('Course not created !');
    }
  }

  async getCourse(CourseId: string): Promise<CourseModel> {
    try {
      const courseDb: Course = await prisma.course.findFirst({
        where: {
          id: CourseId,
        },
      });

      if (!courseDb) {
        Logger.error('Course does not exists !');
        throw new ConflictException('Course does not exists !');
      }

      return {
        ownerId: courseDb.owner_id,
        ...courseDb,
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
      const courseDb: Course = await prisma.course.update({
        where: {
          id: CourseId,
        },
        data: courseData,
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
      const courseSectionsDb: Section[] = await prisma.section.findMany({
        where: {
          course_id: CourseId,
        },
      });

      if (!courseSectionsDb) {
        Logger.error('No sections for this course !');
        throw new NotFoundException('No sections for this course !');
      }

      return courseSectionsDb.map((lesson: Section) => {
        return {
          courseId: lesson.course_id,
          ...lesson,
        };
      }) as SectionModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Sections not found !');
    }
  }

  async getCoursesOwnedByUser(ctx: any): Promise<CourseModel[]> {
    try {
      const coursesDb: Course[] = await prisma.course.findMany({
        where: {
          owner_id: ctx.__user.id,
        },
      });

      return coursesDb.map((courseDb) => ({
        ownerId: courseDb.owner_id,
        ...courseDb,
      })) as CourseModel[];
    } catch (error) {
      // Handle errors
      throw new Error('Error retrieving courses owned by user !');
    }
  }

  async getCoursesSubscribedByUser(ctx: any): Promise<CourseModel[]> {
    try {
      const coursesDb: Course[] = await prisma.course.findMany({
        where: {
          userlist: {
            some: {
              user_id: ctx.__user.id,
              role_user: {
                not: 'OWNER',
              }
            },
          },
        },
      });

      return coursesDb.map((courseDb) => ({
        ownerId: courseDb.owner_id,
        ...courseDb,
      })) as CourseModel[];
    } catch (error) {
      // Handle errors
      throw new Error('Error retrieving courses subscribed by user !');
    }
  }
}
