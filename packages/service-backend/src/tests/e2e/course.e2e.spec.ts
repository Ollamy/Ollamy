import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { prismaMock } from './singleton';
import { CourseModule } from 'course/course.module';
import { UserService } from 'user/user.service';
import * as cookieParser from 'cookie-parser';
import * as Data from './data/data';
import { v4 as uuidv4 } from 'uuid';
import { Durationtype } from 'course/course.dto';

const PORT = 3334;
pactum.request.setBaseUrl(`http://localhost:${PORT}`);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, CourseModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );

    app.use(cookieParser());
    await app.init();

    await app.listen(PORT);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a course', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.course.create.mockResolvedValue({
      id: uuidv4(),
      ...Data.courseData,
    });

    await pactum
      .spec()
      .post('/course')
      .withCookies('session', token)
      .withBody(Data.courseData)
      .expectStatus(201);
  });

  it('should delete a course', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );
    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.course.delete.mockResolvedValue(Data.courseData);

    await pactum
      .spec()
      .delete('/course')
      .withCookies('session', token)
      .withBody({ id: Data.courseData.id })
      .expectStatus(200);
  });

  it('should get a course', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.course.findUnique.mockResolvedValue(Data.courseData);
    prismaMock.usertoCourse.findUnique.mockResolvedValue(undefined);

    await pactum
      .spec()
      .get('/course/:id')
      .withCookies('session', token)
      .withQueryParams({ id: Data.courseData.id })
      .expectStatus(200);
  });

  it('should update a course', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.course.update.mockResolvedValue(Data.returnCourseData);

    await pactum
      .spec()
      .put('/course/:id')
      .withCookies('session', token)
      .withBody({
        title: Data.courseUpdatedTitle,
      })
      .withQueryParams({ id: Data.courseData.id })
      .expectStatus(200);
  });

  it('should update a course', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.course.update.mockResolvedValue(Data.returnCourseData);

    await pactum
      .spec()
      .put('/course/:id')
      .withCookies('session', token)
      .withBody({
        title: Data.courseUpdatedTitle,
      })
      .withQueryParams({ id: Data.courseData.id })
      .expectStatus(200);
  });

  it(`should get course's sections`, async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.section.findMany.mockResolvedValue(Data.sectionsArray);

    await pactum
      .spec()
      .get('/course/:id/sections')
      .withCookies('session', token)
      .withQueryParams({ id: Data.courseData.id })
      .expectStatus(200);
  });

  it(`should get course's sections`, async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.course.findFirst.mockResolvedValue(Data.courseData);

    await pactum
      .spec()
      .post('/course/:id/share')
      .withCookies('session', token)
      .withQueryParams({
        id: Data.courseData.id,
        duration: Durationtype.ONE_WEEK,
      })
      .expectStatus(201);
  });

  it(`should create a course share code`, async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.course.findFirst.mockResolvedValue(Data.courseData);
    prismaMock.usertoCourse.findUnique.mockResolvedValue(Data.userToCourseData);

    await pactum
      .spec()
      .post('/course/:id/share')
      .withCookies('session', token)
      .withQueryParams({
        id: Data.courseData.id,
        duration: Durationtype.ONE_WEEK,
      })
      .expectStatus(201);
  });

  it(`should get user to course hp`, async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.usertoCourse.findUnique.mockResolvedValue(Data.userToCourseData);

    await pactum
      .spec()
      .get('/course/:id/user/hp')
      .withCookies('session', token)
      .withQueryParams({
        id: Data.courseData.id,
      })
      .expectStatus(200);
  });
});
