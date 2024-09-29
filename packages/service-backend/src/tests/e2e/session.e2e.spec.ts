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

const PORT = 3338;
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

  it('should get a session', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );
    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.userSession.findUnique.mockResolvedValue(Data.sessionData);

    await pactum
      .spec()
      .get('/session/:sessionId')
      .withCookies('session', token)
      .withBody({ sessionId: Data.sessionData.session_id })
      .expectStatus(200);
  });
});
