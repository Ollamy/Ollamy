import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { prismaMock } from './singleton';
import { LectureModule } from 'lecture/lecture.module';
import { UserService } from 'user/user.service';
import * as cookieParser from 'cookie-parser';
import * as Data from './data/data';
import { v4 as uuidv4 } from 'uuid';

const PORT = 3337;
pactum.request.setBaseUrl(`http://localhost:${PORT}`);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, LectureModule],
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

  it('should create a lecture', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.lecture.findMany.mockResolvedValue([]);
    prismaMock.lecture.create.mockResolvedValue({
      id: uuidv4(),
      ...Data.lectureData,
    });

    await pactum
      .spec()
      .post('/lecture')
      .withCookies('session', token)
      .withBody(Data.createLectureData)
      .expectStatus(201);
  });

  it('should delete a lecture', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );
    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.lecture.delete.mockResolvedValue(Data.lectureData);

    await pactum
      .spec()
      .delete('/lecture')
      .withCookies('session', token)
      .withBody({ id: Data.lectureData.id })
      .expectStatus(200);
  });

  it('should update a lecture', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.lecture.update.mockResolvedValue(Data.lectureData);

    await pactum
      .spec()
      .put('/lecture/:id')
      .withCookies('session', token)
      .withBody({
        title: Data.lectureUpdatedTitle,
      })
      .withQueryParams({ id: Data.courseData.id })
      .expectStatus(200);
  });
});
