import { Test } from '@nestjs/testing';
import {
  Course,
  Picture,
  Section,
  UsertoLesson,
  Lesson,
  UsertoCourse,
} from '@prisma/client';
import prisma from 'client';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CourseService } from './course.service';
import {
  CourseModel,
  CreateCourseModel,
  GetCourseRequest,
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
      picture: 'data',
    };
    const mockUserId = '123';
    const mockContext = {
      __user: {
        id: mockUserId,
      },
    };
    const mockPictureDb: Picture = {
      id: '1',
      filename: 'data',
    };
    const mockCourseDb: Course = {
      id: '1',
      owner_id: mockUserId,
      title: 'title',
      description: 'desc',
      picture_id: mockPictureDb.id,
    };
    jest.spyOn(prisma.course, 'create').mockResolvedValue(mockCourseDb);
    jest
      .spyOn(prisma.usertoCourse, 'create')
      .mockResolvedValue({ id: '1' } as any);
    jest.spyOn(prisma.picture, 'create').mockResolvedValue(mockPictureDb);

    // Invoke the function being tested
    const result = await courseService.postCourse(mockCourseData, mockContext);

    // Perform assertions
    expect(prisma.course.create).toHaveBeenCalledTimes(1);
    expect(prisma.course.create).toHaveBeenCalledWith({
      data: {
        owner_id: mockUserId,
        title: 'title',
        description: 'desc',
        picture_id: mockCourseDb.picture_id,
      },
    });

    const expectedResponse = mockCourseDb.id;
    expect(result).toStrictEqual({ id: expectedResponse });
  });

  it('should throw NotFoundException if the course creation fails', async () => {
    jest.spyOn(prisma.course, 'create').mockResolvedValue(null);

    const mockCourseData: CreateCourseModel = {
      title: 'title',
      description: 'desc',
      picture:
        'https://cdn.iconscout.com/icon/free/png-256/free-typescript-1174965.png',
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
      picture:
        'https://cdn.iconscout.com/icon/free/png-256/free-typescript-1174965.png',
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
    const mockPictureDb: Picture = {
      id: '1',
      filename: 'data',
    };
    const mockCourseDb: Course = {
      id: mockCourseId.id,
      owner_id: '1',
      title: 'title',
      description: 'desc',
      picture_id: mockPictureDb.id,
    };
    jest.spyOn(prisma.course, 'delete').mockResolvedValue(mockCourseDb);
    jest.spyOn(prisma.picture, 'delete').mockResolvedValue(mockPictureDb);

    // Invoke the function being tested
    const result = await courseService.deleteCourse(mockCourseId);

    // Perform assertions
    expect(prisma.course.delete).toHaveBeenCalledTimes(1);
    expect(prisma.course.delete).toHaveBeenCalledWith({
      where: {
        ...mockCourseId,
      },
    });

    const expectedResponse = mockCourseId.id;
    expect(result).toStrictEqual({ id: expectedResponse });
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
    const mockPictureDb: Picture = {
      id: '1',
      filename: 'data',
    };
    const mockLastLessonDb = {
      lesson_id: '2',
    } as UsertoLesson;
    const mockLastSectionDb = {
      section_id: '3',
    } as Lesson;
    const mockCourseDb: Course = {
      id: mockCourseId,
      owner_id: '123',
      title: 'title',
      description: 'desc',
      picture_id: mockPictureDb.id,
    };
    const mockUserToCourse: UsertoCourse = {
      id: '',
      permission_course: [],
      permission_section: [],
      permission_lesson: [],
      course_id: '',
      user_id: '',
      role_user: 'MEMBER',
      permission_user: [],
      last_lesson_id: '123',
      last_section_id: '456',
    };
    jest.spyOn(prisma.course, 'findFirst').mockResolvedValue(mockCourseDb);
    jest.spyOn(prisma.picture, 'findFirst').mockResolvedValue(mockPictureDb);
    jest
      .spyOn(prisma.usertoLesson, 'findFirst')
      .mockResolvedValue(mockLastLessonDb);
    jest
      .spyOn(prisma.lesson, 'findUnique')
      .mockResolvedValue(mockLastSectionDb);
    jest
      .spyOn(prisma.usertoCourse, 'findFirst')
      .mockResolvedValue(mockUserToCourse);

    // Invoke the function being tested
    const mockContext = {
      __user: {
        id: '123',
      },
    };
    const result = await courseService.getCourse(mockCourseId, mockContext);

    // Perform assertions
    expect(prisma.course.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.course.findFirst).toHaveBeenCalledWith({
      where: {
        id: mockCourseId,
      },
    });

    const expectedCourseModel: GetCourseRequest = {
      id: mockCourseDb.id,
      ownerId: mockCourseDb.owner_id,
      picture: mockPictureDb.filename,
      title: mockCourseDb.title,
      description: mockCourseDb.description,
      lastLessonId: '123',
      lastSectionId: '456',
    };
    expect(result.picture).toContain('http');
    expect(result.picture).toContain(mockPictureDb.filename);
    delete result.picture;
    delete expectedCourseModel.picture;
    expect(result).toEqual(expectedCourseModel);
  });

  it('should throw ConflictException if the course does not exist', async () => {
    jest.spyOn(prisma.course, 'findFirst').mockResolvedValue(null);

    const mockCourseId = '1';
    const mockUserId = '123';
    const mockContext = {
      __user: {
        id: mockUserId,
      },
    };

    await expect(
      courseService.getCourse(mockCourseId, mockContext),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.course, 'findFirst')
      .mockRejectedValue(new Error('Some error'));

    const mockUserId = '123';
    const mockContext = {
      __user: {
        id: mockUserId,
      },
    };

    const mockCourseId = '1';

    await expect(
      courseService.getCourse(mockCourseId, mockContext),
    ).rejects.toThrow(ConflictException);
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
    const mockPictureDb: Picture = {
      id: '1',
      filename: 'data',
    };
    const mockCourseData: UpdateCourseModel = {
      ownerId: '1',
      title: 'title',
      description: 'desc',
      picture: 'data',
    };
    const mockCourseDb: Course = {
      id: '1',
      owner_id: '123',
      title: 'title',
      description: 'desc',
      picture_id: mockPictureDb.id,
    };
    jest.spyOn(prisma.course, 'update').mockResolvedValue(mockCourseDb);
    jest.spyOn(prisma.picture, 'update').mockResolvedValue(mockPictureDb);

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
      data: {
        title: mockCourseData.title,
        description: mockCourseData.description,
        picture_id: mockPictureDb.id,
      },
    });

    const expectedMessage = mockCourseId;
    expect(result).toStrictEqual({ id: expectedMessage });
  });

  it('should throw ConflictException if the course does not exist', async () => {
    jest.spyOn(prisma.course, 'update').mockResolvedValue(null);

    const mockCourseId = '1';
    const mockPictureDb: Picture = {
      id: '1',
      filename: 'data',
    };
    const mockCourseData: UpdateCourseModel = {
      ownerId: '1',
      title: 'tilte',
      description: 'desc',
      picture: mockPictureDb.filename,
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
    const mockPictureDb: Picture = {
      id: '1',
      filename: 'data',
    };
    const mockCourseData: UpdateCourseModel = {
      ownerId: '1',
      title: 'title',
      description: 'desc',
      picture: mockPictureDb.filename,
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
