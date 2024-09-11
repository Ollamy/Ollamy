import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { v4 as uuidv4 } from 'uuid';
import { prismaMock } from './singleton';
import { CourseModule } from 'course/course.module';
import { UserService } from 'user/user.service';
import { PlatformEnum } from 'user/user.dto';
import * as cookieParser from 'cookie-parser';

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
    const password = '1234aaBB@';
    const hashed_password = new UserService().hashPassword(password);

    const userData = {
      firstname: 'name',
      lastname: 'lastname',
      email: 'testeeeeeee@test.test',
      password: hashed_password,
      platform: PlatformEnum.MAKER,
    };

    const userId = uuidv4();
    const token = await new UserService().createToken(
      userId,
      userData.platform,
    );

    const returnData = {
      ...userData,
      id: userId,
      communities_id: [''],
    };

    const courseData = {
      owner_id: userId,
      title: 'course name',
      description: 'course description',
      picture_id: undefined,
    };

    prismaMock.user.findUnique.mockResolvedValue(returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.course.create.mockResolvedValue({
      id: uuidv4(),
      ...courseData,
    });

    await pactum
      .spec()
      .post('/course')
      .withCookies('session', token)
      .withBody(courseData)
      .expectStatus(201);
  });
});
