import {
  Logger,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateCourseModel,
  IdCourseModel,
  UpdateCourseModel,
  CourseIdResponse,
  CourseTrueResponse,
  GetCourseRequest,
} from './course.dto';
import { SectionModel } from 'section/section.dto';
import prisma from 'client';
import { Course, Prisma, Section } from '@prisma/client';
import { PictureService } from '../picture/picture.service';

@Injectable()
export class CourseService {
  async postCourse(
    courseData: CreateCourseModel,
    ctx: any,
  ): Promise<CourseIdResponse> {
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

      await prisma.usertoCourse.create({
        data: {
          user_id: ctx.__user.id,
          course_id: courseDb.id,
          role_user: 'OWNER',
        },
      });

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

  async getCourse(courseId: string, ctx: any): Promise<GetCourseRequest> {
    try {
      const courseDb: Course = await prisma.course.findFirst({
        where: {
          id: courseId,
        },
      });

      const userToCourse = await prisma.usertoCourse.findFirst({
        where: {
          user_id: ctx.__user.id,
          course_id: courseId,
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
        picture: courseDb.picture_id
          ? await PictureService.getPicture(courseDb.picture_id)
          : undefined,
        lastLessonId: userToCourse?.last_lesson_id,
        lastSectionId: userToCourse?.last_section_id,
      };
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

      return courseSectionsDb.map((lesson: Section) => ({
        courseId: lesson.course_id,
        ...lesson,
      })) as SectionModel[];
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Sections not found !');
    }
  }

  async addUserToCourse(
    courseId: string,
    userId: string,
  ): Promise<CourseTrueResponse> {
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
