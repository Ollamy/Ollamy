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
  CourseIdResponse,
  CourseTrueResponse,
} from './course.dto';
import { SectionModel } from 'section/section.dto';
import prisma from 'client';
import { Course, Prisma, Section } from '@prisma/client';
import { PictureService } from '../picture/picture.service';

@Injectable()
export class CourseService {
  async postCourse(courseData: CreateCourseModel, ctx: any): Promise<CourseIdResponse> {
    try {
      const courseDb = await prisma.course.create({
        data: {
          owner_id: ctx.__user.id,
          title: courseData.title,
          description: courseData.description,
          picture_id: await PictureService.postPicture(courseData.picture),
        },
      });

      if (!courseDb) {
        Logger.error('Failed to create course !');
        throw new NotFoundException('Failed to create course !');
      }
      return { id: courseDb.id } as CourseIdResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course not created !');
    }
  }

  async deleteCourse(courseId: IdCourseModel): Promise<CourseIdResponse> {
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

      return { id: courseDb.id } as CourseIdResponse;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Course already removed !');
      }
      throw new ConflictException('Course not deleted !');
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
        id: courseDb.id,
        ownerId: courseDb.owner_id,
        title: courseDb.title,
        description: courseDb.description,
        picture: await PictureService.getPicture(courseDb.picture_id),
      } as CourseModel;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course does not exists !');
    }
  }

  async updateCourse(
    CourseId: string,
    courseData: UpdateCourseModel,
  ): Promise<CourseIdResponse> {
    try {
      const courseDb: Course = await prisma.course.update({
        where: {
          id: CourseId,
        },
        data: {
          title: courseData.title,
          description: courseData.description,
          picture_id: await PictureService.postPicture(courseData.picture),
        },
      });

      if (!courseDb) {
        Logger.error('Course does not exists !');
        throw new ConflictException('Course does not exists !');
      }

      return { id: courseDb.id } as CourseIdResponse;
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

  async getAllCourses(): Promise<CourseModel[]> {
    try {
      const coursesDb: Course[] = await prisma.course.findMany();

      if (!coursesDb) {
        Logger.error('Course does not exists !');
        throw new ConflictException('Course does not exists !');
      }
  
      return coursesDb.map((courseDb) => ({
        ownerId: courseDb.owner_id,
        ...courseDb,
      })) as CourseModel[];
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Error retrieving courses !');
    }
  }

  async addUserToCourse(courseId: string, userId: string): Promise<CourseTrueResponse> {
    try {
      const userToCourseDb = await prisma.usertoCourse.create({
        data: {
          user_id: userId,
          course_id: courseId,
        },
      });

      if (!userToCourseDb) {
        Logger.error('Failed to add user to course !');
        throw new NotFoundException('Failed to add user to course !');
      }
      return { success: true } as CourseTrueResponse;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('User not added to course !');
    }
  }
}
