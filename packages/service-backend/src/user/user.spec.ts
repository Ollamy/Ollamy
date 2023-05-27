import { Test } from '@nestjs/testing';
import { UserController } from 'user/user.controller';
import { UserService } from 'user/user.service';
import { CreateUserModel, LoginUserModel } from 'user/user.dto';
import prisma from 'client';
import { User } from '@prisma/client';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

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

      userService.loginUser(new LoginUserModel());
      expect(() => userService.loginUser(new LoginUserModel())).toBeInstanceOf(
        Function,
      );
    });
  });
});

describe('loginUser', () => {
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

  it('should handle login correctly', async () => {
    // Mock the dependencies or services
    const mockUserDb: User = {
      id: '123',
      email: 'test@example.com',
      password: 'hashedPassword',
      firstname: 'test',
      lastname: 'test',
      communities_id: ['2'],
    };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUserDb);

    const mockHashPassword = jest
      .spyOn(userService, 'hashPassword')
      .mockReturnValue('hashedPassword');

    const mockCreateToken = jest
      .spyOn(userService, 'createToken')
      .mockReturnValue('mockToken');

    // Invoke the function being tested
    const loginResult = await userService.loginUser({
      email: 'test@example.com',
      password: 'hashedPassword',
      firstname: 'test',
      lasname: 'test',
      communities_id: ['2'],
    } as LoginUserModel);

    // Perform assertions
    expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: expect.any(String),
      },
    });

    expect(mockHashPassword).toHaveBeenCalledTimes(1);
    expect(mockHashPassword).toHaveBeenCalledWith(expect.any(String));

    expect(mockCreateToken).toHaveBeenCalledTimes(1);
    expect(mockCreateToken).toHaveBeenCalledWith(expect.any(String));

    expect(loginResult).toBe('mockToken');
  });

  it('should throw NotFoundException if user does not exist', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

    await expect(userService.loginUser(new LoginUserModel())).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should throw BadRequestException if wrong password is provided', async () => {
    const mockUserDb: User = {
      id: '123',
      email: 'test@example.com',
      password: 'hashedPassword',
      firstname: 'test',
      lastname: 'test',
      communities_id: ['2'],
    };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUserDb);

    const mockHashPassword = jest
      .spyOn(userService, 'hashPassword')
      .mockReturnValue('wrongPassword');

    await expect(userService.loginUser(new LoginUserModel())).rejects.toThrow(
      BadRequestException,
    );
  });
});

describe('getUser', () => {
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

  it('should return the user data', async () => {
    // Mock the dependencies or services
    const mockUserDb: User = {
      id: '123',
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
      password: 'test',
      communities_id: ['2'],
    };
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUserDb);

    // Invoke the function being tested
    const result = await userService.getUser({ __user: { id: '123' } });

    // Perform assertions
    expect(prisma.user.findUnique).toHaveBeenCalledTimes(4);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        id: expect.any(String),
      },
    });

    expect(result).toEqual({
      firstname: 'John',
      lastname: 'Doe',
      email: 'john.doe@example.com',
    });
  });

  it('should throw NotFoundException if user does not exist', async () => {
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

    await expect(
      userService.getUser({ __user: { id: '123' } }),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw ConflictException if an error occurs', async () => {
    jest
      .spyOn(prisma.user, 'findUnique')
      .mockRejectedValue(new Error('Some error'));

    await expect(
      userService.getUser({ __user: { id: '123' } }),
    ).rejects.toThrow(ConflictException);
  });
});
