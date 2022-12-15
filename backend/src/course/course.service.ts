import {
  Logger,
  ConflictException,
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CourseModel, IdCourseModel, UpdateCourseModel } from './course.dto';
import { SectionModel } from 'section/section.dto';
import prisma from 'client';
import * as jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  async postCourse(courseData: CourseModel, token: string): Promise<string> {
    const parsedJwt = jwt.decode(token);

    if (!parsedJwt) {
      Logger.error('Token not valid !');
      throw new BadRequestException('Token not valid !');
    }

    try {
      const courseDb = await prisma.course.create({
        data: {
          owner_id: parsedJwt['id'],
          title: courseData.Title,
          description: courseData.Description,
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

  async deleteCourse(
    courseData: IdCourseModel,
    token: string,
  ): Promise<string> {
    const parsedJwt = jwt.decode(token);

    if (!parsedJwt) {
      Logger.error('Token not valid !');
      throw new BadRequestException('Token not valid !');
    }

    try {
      const courseDb = await prisma.course.delete({
        where: {
          id: courseData.Id,
        },
      });

      if (!courseDb) {
        Logger.error('Course does not exists !');
        throw new NotFoundException('Course does not exists !');
      }

      return `Course's ${courseData.Id} has been deleted.`;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Course already removed !');
      } else {
        throw new ConflictException('Course not created !');
      }
    }
  }

  async getCourse(CourseId: string, token: string): Promise<string> {
    const parsedJwt = jwt.decode(token);

    if (!parsedJwt) {
      Logger.error('Token not valid !');
      throw new BadRequestException('Token not valid !');
    }

    try {
      const courseDb = await prisma.course.findFirst({
        where: {
          AND: {
            owner_id: parsedJwt['id'],
            id: CourseId,
          },
        },
      });

      if (!courseDb) {
        Logger.error('Course does not exists !');
        throw new ConflictException('Course does not exists !');
      }

      const course: CourseModel = {
        Id: courseDb.id,
        OwnerId: courseDb.owner_id,
        Title: courseDb.title,
        Description: courseDb.description,
      };

      return JSON.stringify(course);
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
          owner_id: courseData.OwnerId,
          title: courseData.Title,
          description: courseData.Description,
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

  async getCourseSections(CourseId: string): Promise<string> {
    try {

      const courseSectionsDb = await prisma.section.findMany({
        where: {
          course_id: CourseId
        },
      });

      if (!courseSectionsDb) {
        Logger.error('No sections for this course !');
        throw new NotFoundException('No sections for this course !');
      }

      let sections : SectionModel[] = Array();

      courseSectionsDb.forEach((section) => {
        sections.push({
          Id: section.id,
          CourseId: section.course_id,
          Title: section.title,
          Description: section.description
        })
      });

      return JSON.stringify(sections);
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('Sections not found !');
    }
  }
}
