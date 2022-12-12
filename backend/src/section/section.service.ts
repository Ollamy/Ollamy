import { Logger, ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { SectionModel } from './section.dto';
import prisma from 'client';

@Injectable()
export class SectionService {

  async postSection(sectionData: SectionModel): Promise<string> {
    try {
      const sectionDb = await prisma.section.create({
        data: {
            course_id: sectionData.Course_id
        },
      });
      sectionData.Id = sectionDb.id;
      return "Section created";
    } catch (error) {
      Logger.error(error);
      throw new ConflictException('Section not created !');
    }
  }

  async deleteSection(sectionData: SectionModel): Promise<string> {
    try {
        const sectionDb = await prisma.section.delete({
            where: {
                id: sectionData.Id,
              },
        });
        return "Section deleted"
    } catch (error) {
        Logger.error(error);
      throw new ConflictException('Section not deleted !');
    }
  }
}
