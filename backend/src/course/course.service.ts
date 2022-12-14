import { Logger, ConflictException, Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CourseModel, IdCourseModel } from './course.dto';
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

  async deleteCourse(courseData: IdCourseModel, token: string): Promise<string> {
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
                id: CourseId
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
          Description: courseDb.description
        };

        return JSON.stringify(course);
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course not deleted !');
    }
  }

  async updateCourse(CourseId: string, courseData: CourseModel): Promise<string> {
    try {
        const courseDb = await prisma.course.update({
            where: {
              id: CourseId
            }, data: {
              owner_id: courseData.OwnerId,
              title: courseData.Title,
              description: courseData.Description
            }
        });

        if (!courseDb) {
          Logger.error('Course does not exists !');
          throw new ConflictException('Course does not exists !');
        }

        return `Course with id ${courseData.Id} has been updated`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Course not updated !');
    }
  }
}
