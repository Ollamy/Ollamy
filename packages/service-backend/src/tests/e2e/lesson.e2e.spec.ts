import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { prismaMock } from './singleton';
import { LessonModule } from 'lesson/lesson.module';
import { UserService } from 'user/user.service';
import * as cookieParser from 'cookie-parser';
import * as Data from './data';
import { v4 as uuidv4 } from 'uuid';

const PORT = 3336;
pactum.request.setBaseUrl(`http://localhost:${PORT}`);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, LessonModule],
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

  it('should create a lesson', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.lesson.findMany.mockResolvedValue([]);
    prismaMock.lesson.create.mockResolvedValue({
      id: uuidv4(),
      ...Data.lessonData,
    });

    await pactum
      .spec()
      .post('/lesson')
      .withCookies('session', token)
      .withBody(Data.createLessonData)
      .expectStatus(201);
  });

  it('should delete a lesson', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );
    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.lesson.delete.mockResolvedValue(Data.lessonData);

    await pactum
      .spec()
      .delete('/lesson')
      .withCookies('session', token)
      .withBody({ id: Data.lessonData.id })
      .expectStatus(200);
  });

  it('should update a lesson', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.lesson.update.mockResolvedValue(Data.returnLessonData);

    await pactum
      .spec()
      .put('/lesson/:id')
      .withCookies('session', token)
      .withBody({
        title: Data.lessonUpdatedTitle,
      })
      .withQueryParams({ id: Data.courseData.id })
      .expectStatus(200);
  });
});
