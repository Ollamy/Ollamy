import { Logger, ConflictException, Injectable, UnprocessableEntityException, BadRequestException, NotFoundException } from '@nestjs/common';
import { IdSectionModel, SectionModel, UpdateSectionModel } from 'section/section.dto';
import prisma from 'client';
import * as jwt from 'jsonwebtoken';
import { Prisma } from '@prisma/client';


@Injectable()
export class SectionService {

  async postSection(sectionData: SectionModel, token: string): Promise<string> {
    const parsedJwt = jwt.decode(token);

    if (!parsedJwt) {
      Logger.error('Token not valid !');
      throw new BadRequestException('Token not valid !');
    }

    try {
      const sectionDb = await prisma.section.create({
        data: {
            course_id: sectionData.CourseId,
            title: sectionData.Title,
            description: sectionData.Description
        },
      });

      if (!sectionDb) {
        Logger.error('Failed to create section !');
        throw new NotFoundException('Failed to create section !');
      }
      return `Section created with id ${sectionDb.id}`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Section not created !');
    }
  }

  async deleteSection(sectionData: IdSectionModel, token: string): Promise<string> {
    const parsedJwt = jwt.decode(token);

    if (!parsedJwt) {
      Logger.error('Token not valid !');
      throw new BadRequestException('Token not valid !');
    }

    try {
      const sectionDb = await prisma.section.delete({
        where: {
          id: sectionData.Id,
        },
      });

      if (!sectionDb) {
        Logger.error('Section does not exists !');
        throw new NotFoundException('Section does not exists !');
      }

      return `Section's ${sectionData.Id} has been deleted.`;
    } catch (error) {
      Logger.error(error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new ConflictException('Section already removed !');
      } else {
        throw new ConflictException('Section not created !');
      }
    }
  }

  async getSection(SectionId: string, token: string): Promise<string> {
    const parsedJwt = jwt.decode(token);

    if (!parsedJwt) {
      Logger.error('Token not valid !');
      throw new BadRequestException('Token not valid !');
    }

    try {
        const sectionDb = await prisma.section.findFirst({
            where: {
                id: SectionId
            },
        });

        if (!sectionDb) {
          Logger.error('Section does not exists !');
          throw new ConflictException('Section does not exists !');
        }

        const section: SectionModel = {
          Id: sectionDb.id,
          CourseId: sectionDb.course_id,
          Title: sectionDb.title,
          Description: sectionDb.description
        };

        return JSON.stringify(section);
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Section not found !');
    }
  }

  async updateSection(SectionId: string, sectionData: UpdateSectionModel): Promise<string> {
    try {
        const sectionDb = await prisma.section.update({
            where: {
              id: SectionId
            }, data: {
              course_id: sectionData.CourseId,
              title: sectionData.Title,
              description: sectionData.Description
            }
        });

        if (!sectionDb) {
          Logger.error('Section does not exists !');
          throw new ConflictException('Section does not exists !');
        }

        return `Section with id ${SectionId} has been updated`;
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Section not updated !');
    }
  }
}
