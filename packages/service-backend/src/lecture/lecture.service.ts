import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { CreateLectureModel, IdLectureModel, LectureModel, UpdateLectureModel, LectureIdResponse } from 'lecture/lecture.dto';
import prisma from 'client';
import { Prisma, Lecture } from '@prisma/client';

@Injectable()
export class LectureService {
    async postLecture(lectureData: CreateLectureModel): Promise<LectureIdResponse> {
        try {
            const lectureDb = await prisma.lecture.create({
                data: {
                    lesson_id: lectureData.lessonId,
                    data: lectureData.data,
                },
            });

            if (!lectureDb) {
                Logger.error('Failed to create lecture!');
                throw new NotFoundException('Failed to create lecture!');
            }

            return { id: lectureDb.id } as LectureIdResponse;
        } catch (error) {
            Logger.error(error);
            throw new ConflictException('Lecture not created!');
        }
    }

    async deleteLecture(lectureId: IdLectureModel): Promise<LectureIdResponse> {
        try {
            const lectureDb = await prisma.lecture.delete({
                where: {
                    ...lectureId,
                },
            });

            if (!lectureDb) {
                Logger.error('Lecture does not exist!');
                throw new NotFoundException('Lecture does not exist!');
            }

            return { id: lectureDb.id } as LectureIdResponse;
        } catch (error) {
            Logger.error(error);
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                throw new ConflictException('Lecture already removed!');
            }
            throw new ConflictException('Lecture not deleted!');
        }
    }

    async getLecture(lectureId: IdLectureModel): Promise<LectureModel> {
        try {
            const lectureDb = await prisma.lecture.findUnique({
                where: {
                    id: lectureId.id,
                },
            });

            if (!lectureDb) {
                Logger.error('Lecture does not exist!');
                throw new ConflictException('Lecture does not exist!');
            }

            return {
                lessonId: lectureDb.lesson_id,
                data: lectureDb.data,
            } as LectureModel;
        } catch (error) {
            Logger.error(error);
            throw new ConflictException('Lecture not found!');
        }
    }

    async updateLecture(lectureId: IdLectureModel, lectureData: UpdateLectureModel): Promise<LectureIdResponse> {
        try {
            const lectureDb = await prisma.lecture.update({
                where: {
                    id: lectureId.id,
                },
                data: {
                    lesson_id: lectureData.lessonId,
                    data: lectureData.data,
                },
            });

            if (!lectureDb) {
                Logger.error('Lecture does not exist!');
                throw new ConflictException('Lecture does not exist!');
            }

            return { id: lectureDb.id } as LectureIdResponse;
        } catch (error) {
            Logger.error(error);
            throw new ConflictException('Lecture not updated!');
        }
    }
}
