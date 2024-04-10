import { Test } from '@nestjs/testing';
import prisma from 'client';
import { ConflictException } from '@nestjs/common';
import { IdLectureModel } from 'lecture/lecture.dto';
import {
  mockLectureData,
  mockLectureDb,
  mockLectureDb2,
  mockLectureId,
  mockLectureDb3,
  mockLectureData2,
  mockUpdatedLecture,
} from 'tests/data/lecture.data';
import { LectureService } from 'lecture/lecture.service';

describe('postLecture', () => {
  let lectureService: LectureService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LectureService],
    }).compile();

    lectureService = moduleRef.get<LectureService>(LectureService);
  });

  it('should create a lecture and return the ID', async () => {
    jest.spyOn(prisma.lecture, 'create').mockResolvedValue(mockLectureDb);

    // Invoke the function being tested
    const result = await lectureService.postLecture(mockLectureData);

    // Perform assertions
    expect(prisma.lecture.create).toHaveBeenCalledTimes(1);
    expect(prisma.lecture.create).toHaveBeenCalledWith({
      data: {
        lesson_id: mockLectureDb.lesson_id,
        data: mockLectureDb.data,
      },
    });

    expect(result).toStrictEqual({ id: mockLectureDb.id });
  });

  it('should throw NotFoundException if lecture creation fails', async () => {
    jest.spyOn(prisma.lecture, 'create').mockResolvedValue(null);

    await expect(lectureService.postLecture(mockLectureData)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lecture, 'create')
      .mockRejectedValue(new Error('Some error'));

    await expect(lectureService.postLecture(mockLectureData)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('deleteLecture', () => {
  let lectureService: LectureService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LectureService],
    }).compile();

    lectureService = moduleRef.get<LectureService>(LectureService);
  });

  it('should delete a lecture and return the deletion message', async () => {
    jest.spyOn(prisma.lecture, 'delete').mockResolvedValue(mockLectureDb2);

    // Invoke the function being tested
    const result = await lectureService.deleteLecture(mockLectureId);

    // Perform assertions
    expect(prisma.lecture.delete).toHaveBeenCalledTimes(1);
    expect(prisma.lecture.delete).toHaveBeenCalledWith({
      where: {
        id: mockLectureId.id,
      },
    });

    expect(result).toStrictEqual({ id: mockLectureId.id });
  });

  it('should throw NotFoundException if lecture deletion fails', async () => {
    jest.spyOn(prisma.lecture, 'delete').mockResolvedValue(null);

    await expect(lectureService.deleteLecture(mockLectureId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lecture, 'delete')
      .mockRejectedValue(new Error('Some error'));

    await expect(lectureService.deleteLecture(mockLectureId)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('getLecture', () => {
  let lectureService: LectureService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LectureService],
    }).compile();

    lectureService = moduleRef.get<LectureService>(LectureService);
  });

  it('should return a lecture model when the lecture exists', async () => {
    jest.spyOn(prisma.lecture, 'findUnique').mockResolvedValue(mockLectureDb3);

    // Invoke the function being tested
    const result = await lectureService.getLecture({
      id: mockLectureDb2.id,
    } as IdLectureModel);

    // Perform assertions
    expect(prisma.lecture.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.lecture.findUnique).toHaveBeenCalledWith({
      where: {
        id: mockLectureDb2.id,
      },
    });

    expect(result).toEqual({
      lesson_id: mockLectureDb3.lesson_id,
      data: mockLectureDb3.data,
    });
  });

  it('should throw ConflictException if the lecture does not exist', async () => {
    jest.spyOn(prisma.lecture, 'findUnique').mockResolvedValue(null);

    await expect(
      lectureService.getLecture({
        id: mockLectureDb2.id,
      } as IdLectureModel),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lecture, 'findUnique')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      lectureService.getLecture({
        id: mockLectureDb2.id,
      } as IdLectureModel),
    ).rejects.toThrow(ConflictException);
  });
});

describe('updateLecture', () => {
  let lectureService: LectureService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [LectureService],
    }).compile();

    lectureService = moduleRef.get<LectureService>(LectureService);
  });

  it('should return a success message when the lecture is updated', async () => {
    jest.spyOn(prisma.lecture, 'update').mockResolvedValue(mockUpdatedLecture);

    // Invoke the function being tested
    const result = await lectureService.updateLecture(
      {
        id: mockLectureDb2.id,
      } as IdLectureModel,
      mockLectureData2,
    );

    // Perform assertions
    expect(prisma.lecture.update).toHaveBeenCalledTimes(1);
    expect(prisma.lecture.update).toHaveBeenCalledWith({
      where: {
        id: mockLectureDb2.id,
      },
      data: {
        data: mockUpdatedLecture.data,
        lesson_id: mockLectureDb2.lesson_id,
      },
    });

    expect(result).toStrictEqual({ id: mockUpdatedLecture.id });
  });

  it('should throw ConflictException if the lecture does not exist', async () => {
    jest.spyOn(prisma.lecture, 'update').mockResolvedValue(null);

    await expect(
      lectureService.updateLecture(
        {
          id: mockLectureDb2.id,
        } as IdLectureModel,
        mockLectureData2,
      ),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.lecture, 'update')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      lectureService.updateLecture(
        {
          id: mockLectureDb2.id,
        } as IdLectureModel,
        mockLectureData2,
      ),
    ).rejects.toThrow(ConflictException);
  });
});
