import { Test } from '@nestjs/testing';
import { Course, Section } from '@prisma/client';
import prisma from 'client';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';
import {
  CourseModel,
  CreateCourseModel,
  IdCourseModel,
  UpdateCourseModel,
} from './course.dto';
import { SectionModel } from '../section/section.dto';

describe('postCourse', () => {
  let courseService: CourseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    courseService = moduleRef.get<CourseService>(CourseService);
  });

  it('should create a course and return the course ID', async () => {
    // Mock the dependencies or services
    const mockCourseData: CreateCourseModel = {
      title: 'title',
      description: 'desc',
    };
    const mockUserId = '123';
    const mockContext = {
      __user: {
        id: mockUserId,
      },
    };
    const mockCourseDb: Course = {
      id: '1',
      owner_id: mockUserId,
      title: 'title',
      description: 'desc',
    };
    jest.spyOn(prisma.course, 'create').mockResolvedValue(mockCourseDb);

    // Invoke the function being tested
    const result = await courseService.postCourse(mockCourseData, mockContext);

    // Perform assertions
    expect(prisma.course.create).toHaveBeenCalledTimes(1);
    expect(prisma.course.create).toHaveBeenCalledWith({
      data: {
        owner_id: mockUserId,
        ...mockCourseData,
      },
    });

    const expectedResponse = `Course created with id ${mockCourseDb.id}`;
    expect(result).toEqual(expectedResponse);
  });

  it('should throw NotFoundException if the course creation fails', async () => {
    jest.spyOn(prisma.course, 'create').mockResolvedValue(null);

    const mockCourseData: CreateCourseModel = {
      title: 'title',
      description: 'desc',
    };
    const mockUserId = '123';
    const mockContext = {
      __user: {
        id: mockUserId,
      },
    };

    await expect(
      courseService.postCourse(mockCourseData, mockContext),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.course, 'create')
      .mockRejectedValue(new Error('Some error'));

    const mockCourseData: CreateCourseModel = {
      title: 'title',
      description: 'desc',
    };
    const mockUserId = '123';
    const mockContext = {
      __user: {
        id: mockUserId,
      },
    };

    await expect(
      courseService.postCourse(mockCourseData, mockContext),
    ).rejects.toThrow(ConflictException);
  });
});

describe('deleteCourse', () => {
  let courseService: CourseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    courseService = moduleRef.get<CourseService>(CourseService);
  });

  it('should delete a course and return a success message', async () => {
    // Mock the dependencies or services
    const mockCourseId: IdCourseModel = {
      id: '1',
    };
    const mockCourseDb: Course = {
      id: mockCourseId.id,
      owner_id: '1',
      title: 'title',
      description: 'desc',
    };
    jest.spyOn(prisma.course, 'delete').mockResolvedValue(mockCourseDb);

    // Invoke the function being tested
    const result = await courseService.deleteCourse(mockCourseId);

    // Perform assertions
    expect(prisma.course.delete).toHaveBeenCalledTimes(1);
    expect(prisma.course.delete).toHaveBeenCalledWith({
      where: {
        ...mockCourseId,
      },
    });

    const expectedResponse = `Course's ${mockCourseId.id} has been deleted.`;
    expect(result).toEqual(expectedResponse);
  });

  it('should throw NotFoundException if the course does not exist', async () => {
    jest.spyOn(prisma.course, 'delete').mockResolvedValue(null);

    const mockCourseId: IdCourseModel = {
      id: '1',
    };

    await expect(courseService.deleteCourse(mockCourseId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.course, 'delete')
      .mockRejectedValue(new Error('Some error'));

    const mockCourseId: IdCourseModel = {
      id: '1',
    };

    await expect(courseService.deleteCourse(mockCourseId)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('getCourse', () => {
  let courseService: CourseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    courseService = moduleRef.get<CourseService>(CourseService);
  });

  it('should retrieve a course and return the course model', async () => {
    // Mock the dependencies or services
    const mockCourseId = '1';
    const mockCourseDb: Course = {
      id: mockCourseId,
      owner_id: '123',
      title: 'title',
      description: 'desc',
    };
    jest.spyOn(prisma.course, 'findFirst').mockResolvedValue(mockCourseDb);

    // Invoke the function being tested
    const result = await courseService.getCourse(mockCourseId);

    // Perform assertions
    expect(prisma.course.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.course.findFirst).toHaveBeenCalledWith({
      where: {
        id: mockCourseId,
      },
    });

    const expectedCourseModel: CourseModel = {
      ownerId: mockCourseDb.owner_id,
      ...mockCourseDb,
    };
    expect(result).toEqual(expectedCourseModel);
  });

  it('should throw ConflictException if the course does not exist', async () => {
    jest.spyOn(prisma.course, 'findFirst').mockResolvedValue(null);

    const mockCourseId = '1';

    await expect(courseService.getCourse(mockCourseId)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.course, 'findFirst')
      .mockRejectedValue(new Error('Some error'));

    const mockCourseId = '1';

    await expect(courseService.getCourse(mockCourseId)).rejects.toThrow(
      ConflictException,
    );
  });
});

describe('updateCourse', () => {
  let courseService: CourseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    courseService = moduleRef.get<CourseService>(CourseService);
  });
  it('should update a course and return a success message', async () => {
    // Mock the dependencies or services
    const mockCourseId = '1';
    const mockCourseData: UpdateCourseModel = {
      ownerId: '1',
      title: 'title',
      description: 'desc',
    };
    const mockCourseDb: Course = {
      id: '1',
      owner_id: '123',
      title: 'title',
      description: 'desc',
    };
    jest.spyOn(prisma.course, 'update').mockResolvedValue(mockCourseDb);

    // Invoke the function being tested
    const result = await courseService.updateCourse(
      mockCourseId,
      mockCourseData,
    );

    // Perform assertions
    expect(prisma.course.update).toHaveBeenCalledTimes(1);
    expect(prisma.course.update).toHaveBeenCalledWith({
      where: {
        id: mockCourseId,
      },
      data: mockCourseData,
    });

    const expectedMessage = `Course with id ${mockCourseId} has been updated`;
    expect(result).toEqual(expectedMessage);
  });

  it('should throw ConflictException if the course does not exist', async () => {
    jest.spyOn(prisma.course, 'update').mockResolvedValue(null);

    const mockCourseId = '1';
    const mockCourseData: UpdateCourseModel = {
      ownerId: '1',
      title: 'tilte',
      description: 'desc',
    };

    await expect(
      courseService.updateCourse(mockCourseId, mockCourseData),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.course, 'update')
      .mockRejectedValue(new Error('Some error'));

    const mockCourseId = '1';
    const mockCourseData: UpdateCourseModel = {
      ownerId: '1',
      title: 'title',
      description: 'desc',
    };

    await expect(
      courseService.updateCourse(mockCourseId, mockCourseData),
    ).rejects.toThrow(ConflictException);
  });
});

describe('getCourseSections', () => {
  let courseService: CourseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    courseService = moduleRef.get<CourseService>(CourseService);
  });

  it('should return an array of course sections', async () => {
    // Mock the dependencies or services
    const mockCourseId = '1';
    const mockSection1: Section = {
      id: '1',
      course_id: mockCourseId,
      title: 'title',
      description: 'desc',
    };
    const mockSection2: Section = {
      id: '2',
      course_id: mockCourseId,
      title: 'title',
      description: 'desc',
    };
    const mockCourseSectionsDb: Section[] = [mockSection1, mockSection2];
    jest
      .spyOn(prisma.section, 'findMany')
      .mockResolvedValue(mockCourseSectionsDb);

    // Invoke the function being tested
    const result = await courseService.getCourseSections(mockCourseId);

    // Perform assertions
    expect(prisma.section.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.section.findMany).toHaveBeenCalledWith({
      where: {
        course_id: mockCourseId,
      },
    });

    const expectedSections: SectionModel[] = [
      {
        courseId: mockSection1.course_id,
        ...mockSection1,
      },
      {
        courseId: mockSection2.course_id,
        ...mockSection2,
      },
    ];
    expect(result).toEqual(expectedSections);
  });

  it('should throw NotFoundException if an error occurs', async () => {
    jest
      .spyOn(prisma.section, 'findMany')
      .mockRejectedValue(new Error('Some error'));

    const mockCourseId = '1';

    await expect(courseService.getCourseSections(mockCourseId)).rejects.toThrow(
      NotFoundException,
    );
  });
});