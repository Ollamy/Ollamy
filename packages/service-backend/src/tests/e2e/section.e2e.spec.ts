import { Test } from '@nestjs/testing';
import { AppModule } from 'app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';
import { prismaMock } from './singleton';
import { SectionModule } from 'section/section.module';
import { UserService } from 'user/user.service';
import * as cookieParser from 'cookie-parser';
import * as Data from './data/data';
import { v4 as uuidv4 } from 'uuid';

const PORT = 3335;
pactum.request.setBaseUrl(`http://localhost:${PORT}`);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, SectionModule],
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

  it('should create a section', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.section.findMany.mockResolvedValue([]);
    prismaMock.section.create.mockResolvedValue({
      id: uuidv4(),
      ...Data.sectionsData,
    });

    await pactum
      .spec()
      .post('/section')
      .withCookies('session', token)
      .withBody(Data.createSectionData)
      .expectStatus(201);
  });

  it('should delete a section', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );
    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.section.delete.mockResolvedValue(Data.sectionsData);

    await pactum
      .spec()
      .delete('/section')
      .withCookies('session', token)
      .withBody({ id: Data.sectionsData.id })
      .expectStatus(200);
  });

  it('should get a section', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.section.findUnique.mockResolvedValue(Data.sectionsData);

    await pactum
      .spec()
      .get('/section/:id')
      .withCookies('session', token)
      .withQueryParams({ id: Data.sectionsData.id })
      .expectStatus(200);
  });

  it('should update a course', async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.section.update.mockResolvedValue(Data.returnSectionData);

    await pactum
      .spec()
      .put('/section/:id')
      .withCookies('session', token)
      .withBody({
        title: Data.sectionUpdatedTitle,
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
    prismaMock.section.update.mockResolvedValue(Data.returnSectionData);

    await pactum
      .spec()
      .put('/section/order')
      .withCookies('session', token)
      .withBody(Data.orderUpdate)
      .expectStatus(200);
  });

  it(`should get section's lessons`, async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.lesson.findMany.mockResolvedValue(Data.lessonArray);

    await pactum
      .spec()
      .get('/section/lessons/:id')
      .withCookies('session', token)
      .withQueryParams({ id: Data.sectionsData.id })
      .expectStatus(200);
  });

  it(`should join section`, async () => {
    const token = await new UserService().createToken(
      Data.userId,
      Data.userData.platform,
    );

    prismaMock.user.findUnique.mockResolvedValue(Data.returnData);
    prismaMock.usertoCourse.findMany.mockResolvedValue([]);
    prismaMock.usertoSection.create.mockResolvedValue(Data.returnUserToSection);

    await pactum
      .spec()
      .post('/section/:id/join')
      .withCookies('session', token)
      .withQueryParams({ id: Data.sectionsData.id })
      .expectStatus(201);
  });
});
