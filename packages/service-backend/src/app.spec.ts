import { Test } from '@nestjs/testing';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = moduleRef.get<AppService>(AppService);
    appController = moduleRef.get<AppController>(AppController);
  });

  describe('healthCheck', () => {
    it('should return ok when server is up', async () => {
      const result = 'OK';
      jest.spyOn(appService, 'healthCheck').mockImplementation(() => result);

      expect(await appController.healthCheck()).toBe(result);
    });
  });
});
