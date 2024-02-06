import { Test } from '@nestjs/testing';
import prisma from 'client';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { CourseService } from 'course/course.service';
import { GetCourseRequest } from 'course/course.dto';
import { SectionModel } from 'section/section.dto';
import { context } from 'tests/data/user.data';
import {
  courseId,
  createCourseData,
  deleteCourseId,
  mockCourseDb,
  mockLastLessonDb,
  mockLastSectionDb,
  mockPictureDb,
  mockSection1,
  mockSection2,
  mockUpdateCourseData,
  mockUserToCourse,
} from 'tests/data/course.data';

describe('postCourse', () => {
  let courseService: CourseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [CourseService],
    }).compile();

    courseService = moduleRef.get<CourseService>(CourseService);
  });

  it('should create a course and return the course ID', async () => {
    {
      // Spy on expected prisma function to be called
      jest.spyOn(prisma.course, 'create').mockResolvedValue(mockCourseDb);
      jest.spyOn(prisma.usertoCourse, 'create').mockResolvedValue(null);
      jest.spyOn(prisma.picture, 'create').mockResolvedValue(mockPictureDb);
    }

    {
      // Invoke the function being tested and Perform assertions
      const result = await courseService.postCourse(createCourseData, context);
      expect(prisma.course.create).toHaveBeenCalledTimes(1);
      expect(prisma.course.create).toHaveBeenCalledWith({
        data: {
          owner_id: context.__user.id,
          title: createCourseData.title,
          description: createCourseData.description,
          picture_id: mockPictureDb.id,
        },
      });
      expect(prisma.usertoCourse.create).toHaveBeenCalledTimes(1);

      const expectedResponse = mockCourseDb.id;
      expect(result).toStrictEqual({ id: expectedResponse });
    }
  });

  it('should throw ConflictException if the course creation fails', async () => {
    {
      jest.spyOn(prisma.course, 'create').mockResolvedValue(null);
    }

    {
      await expect(
        courseService.postCourse(createCourseData, context),
      ).rejects.toThrow(ConflictException);
    }
  });

  it('should throw ConflictException if an error occurs', async () => {
    {
      jest
        .spyOn(prisma.course, 'create')
        .mockRejectedValue(new Error('Some error'));
    }

    {
      await expect(
        courseService.postCourse(createCourseData, context),
      ).rejects.toThrow(ConflictException);
    }
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
    {
      // Mock the dependencies or services
      jest.spyOn(prisma.course, 'delete').mockResolvedValue(mockCourseDb);
      jest.spyOn(prisma.picture, 'delete').mockResolvedValue(mockPictureDb);
    }

    {
      // Invoke the function being tested and Perform assertions
      const result = await courseService.deleteCourse(deleteCourseId);

      expect(prisma.course.delete).toHaveBeenCalledTimes(1);
      expect(prisma.course.delete).toHaveBeenCalledWith({
        where: {
          ...deleteCourseId,
        },
      });

      const expectedResponse = deleteCourseId.id;
      expect(result).toStrictEqual({ id: expectedResponse });
    }
  });

  it('should throw NotFoundException if the course does not exist', async () => {
    {
      jest.spyOn(prisma.course, 'delete').mockResolvedValue(null);
    }

    {
      await expect(courseService.deleteCourse(deleteCourseId)).rejects.toThrow(
        ConflictException,
      );
    }
  });

  it('should throw ConflictException if an error occurs', async () => {
    {
      jest
        .spyOn(prisma.course, 'delete')
        .mockRejectedValue(new Error('Some error'));
    }

    {
      await expect(courseService.deleteCourse(deleteCourseId)).rejects.toThrow(
        ConflictException,
      );
    }
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
    {
      // Mock the dependencies or services
      jest.spyOn(prisma.course, 'findFirst').mockResolvedValue(mockCourseDb);
      jest.spyOn(prisma.picture, 'findFirst').mockResolvedValue(mockPictureDb);
      jest
        .spyOn(prisma.usertoCourse, 'findFirst')
        .mockResolvedValue(mockUserToCourse);
    }

    {
      // Invoke the function being tested and Perform assertions
      const result = await courseService.getCourse(courseId, context);

      expect(prisma.course.findFirst).toHaveBeenCalledTimes(1);
      expect(prisma.course.findFirst).toHaveBeenCalledWith({
        where: {
          id: courseId,
        },
      });

      const expectedCourseModel: GetCourseRequest = {
        id: mockCourseDb.id,
        ownerId: mockCourseDb.owner_id,
        picture: mockPictureDb.filename,
        title: mockCourseDb.title,
        description: mockCourseDb.description,
        lastLessonId: mockLastLessonDb.lesson_id,
        lastSectionId: mockLastSectionDb.section_id,
      };
      expect(result.picture).toContain('http');
      expect(result.picture).toContain(mockPictureDb.filename);
      delete result.picture;
      delete expectedCourseModel.picture;
      expect(result).toEqual(expectedCourseModel);
    }
  });

  it('should throw ConflictException if the course does not exist', async () => {
    {
      jest.spyOn(prisma.course, 'findFirst').mockResolvedValue(null);
    }

    {
      await expect(courseService.getCourse(courseId, context)).rejects.toThrow(
        ConflictException,
      );
    }
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.course, 'findFirst')
      .mockRejectedValue(new Error('Some error'));

    await expect(courseService.getCourse(courseId, context)).rejects.toThrow(
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
    {
      // Mock the dependencies or services
      jest.spyOn(prisma.course, 'update').mockResolvedValue(mockCourseDb);
      jest.spyOn(prisma.picture, 'update').mockResolvedValue(mockPictureDb);
    }

    {
      // Invoke the function being tested and Perform assertions
      const result = await courseService.updateCourse(
        courseId,
        mockUpdateCourseData,
      );

      expect(prisma.course.update).toHaveBeenCalledTimes(1);
      expect(prisma.course.update).toHaveBeenCalledWith({
        where: {
          id: courseId,
        },
        data: {
          title: mockUpdateCourseData.title,
          description: mockUpdateCourseData.description,
          picture_id: mockPictureDb.id,
        },
      });

      const expectedMessage = courseId;
      expect(result).toStrictEqual({ id: expectedMessage });
    }
  });

  it('should throw ConflictException if the course does not exist', async () => {
    {
      jest.spyOn(prisma.course, 'update').mockResolvedValue(null);
    }

    {
      await expect(
        courseService.updateCourse(courseId, mockUpdateCourseData),
      ).rejects.toThrow(ConflictException);
    }
  });

  it('should throw ConflictException if an error occurs', async () => {
    {
      jest
        .spyOn(prisma.course, 'update')
        .mockRejectedValue(new Error('Some error'));
    }

    {
      await expect(
        courseService.updateCourse(courseId, mockUpdateCourseData),
      ).rejects.toThrow(ConflictException);
    }
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
    {
      // Spy on the dependencies or services
      jest
        .spyOn(prisma.section, 'findMany')
        .mockResolvedValue([mockSection1, mockSection2]);
    }

    {
      // Invoke the function being tested and perform asserstions
      const result = await courseService.getCourseSections(courseId);

      expect(prisma.section.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.section.findMany).toHaveBeenCalledWith({
        where: {
          course_id: courseId,
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
    }
  });

  it('should throw NotFoundException if an error occurs', async () => {
    {
      jest
        .spyOn(prisma.section, 'findMany')
        .mockRejectedValue(new Error('Some error'));
    }

    {
      await expect(courseService.getCourseSections(courseId)).rejects.toThrow(
        NotFoundException,
      );
    }
  });
});
