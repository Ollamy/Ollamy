import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { v4 as uuidv4 } from 'uuid';
import { prismaMock } from './singleton';
import { UserModule } from 'user/user.module';
import { UserService } from 'user/user.service';
import { PlatformEnum } from 'user/user.dto';
import * as cookieParser from 'cookie-parser';

const PORT = 3333;
pactum.request.setBaseUrl(`http://localhost:${PORT}`);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, UserModule],
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

  it('should create a user', async () => {
    const userData = {
      firstname: 'name',
      lastname: 'lastname',
      email: 'testeeeeeee@test.test',
      password: '1234aaBB@',
      platform: 'MAKER',
    };

    prismaMock.user.create.mockResolvedValue({
      id: uuidv4(),
      ...userData,
      communities_id: [''],
    });

    await pactum
      .spec()
      .post('/user/register')
      .withBody(userData)
      .expectStatus(201);
  });

  it('should login a user', async () => {
    const password = '1234aaBB@';
    const hashed_password = new UserService().hashPassword(password);

    const userData = {
      firstname: 'name',
      lastname: 'lastname',
      email: 'testeeeeeee@test.test',
      password: hashed_password,
      platform: 'MAKER',
    };

    // Mock the response of your Prisma query here if needed

    prismaMock.user.findUnique.mockResolvedValue({
      id: uuidv4(),
      ...userData,
      communities_id: [''],
    });

    await pactum
      .spec()
      .post('/user/login')
      .withBody({
        email: userData.email,
        password: password,
        platform: userData.platform,
      })
      .expectStatus(201);
  });

  it('should get a user', async () => {
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

    prismaMock.user.findUnique.mockResolvedValue({
      id: userId,
      ...userData,
      communities_id: [''],
    });

    prismaMock.usertoCourse.findMany.mockResolvedValue([]);

    await pactum
      .spec()
      .get('/user')
      .withCookies('session', token)
      .expectStatus(200);
  });

  it('should update a user', async () => {
    const password = '1234aaBB@';
    const hashed_password = new UserService().hashPassword(password);
    const firstName = 'new name';

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
      firstName: firstName,
      communities_id: [''],
    };

    prismaMock.user.findUnique.mockResolvedValue(returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.user.update.mockResolvedValue(returnData);

    await pactum
      .spec()
      .put('/user')
      .withCookies('session', token)
      .withBody({
        firstname: firstName,
      })
      .expectStatus(200);
  });

  it('should delete a user', async () => {
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

    prismaMock.user.findUnique.mockResolvedValue(returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.user.delete.mockResolvedValue(returnData);

    await pactum
      .spec()
      .delete('/user')
      .withCookies('session', token)
      .expectStatus(200);
  });

  it('should return user courses', async () => {
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

    prismaMock.user.findUnique.mockResolvedValue(returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);

    await pactum
      .spec()
      .get('/user/courses')
      .withCookies('session', token)
      .expectStatus(200);
  });

  it('should return user score', async () => {
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

    prismaMock.user.findUnique.mockResolvedValue(returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.usertoScore.findUnique.mockResolvedValue({
      id: uuidv4(),
      user_id: userId,
      score: 10,
    });

    await pactum
      .spec()
      .get('/user/score')
      .withCookies('session', token)
      .expectStatus(200);
  });

  it('should logout', async () => {
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

    prismaMock.user.findUnique.mockResolvedValue(returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);

    await pactum
      .spec()
      .post('/user/logout')
      .withCookies('session', token)
      .expectStatus(201);
  });
});
