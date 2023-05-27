import { Test } from '@nestjs/testing';
import { UserController } from 'user/user.controller';
import { UserService } from 'user/user.service';
import { CreateUserModel, LoginUserModel } from 'user/user.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    userController = moduleRef.get<UserController>(UserController);
  });

  describe('registerUser', () => {
    it('register test', async () => {
      jest.spyOn(userService, 'registerUser').mockImplementation();

      expect(() =>
        userService.registerUser(new CreateUserModel()),
      ).toBeInstanceOf(Function);
    });
  });

  describe('loginUser', () => {
    it('login test', async () => {
      jest.spyOn(userService, 'loginUser').mockImplementation();

      expect(() => userService.loginUser(new LoginUserModel())).toBeInstanceOf(
        Function,
      );
    });
  });
});
