import { Test } from '@nestjs/testing';
import { UserController } from 'user/user.controller';
import { UserService } from 'user/user.service';
import { CreateUserModel, LoginUserModel, PlatformEnum } from 'user/user.dto';
import prisma from 'client';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import {
  context,
  loginUserData,
  mockUserDb,
  userId,
} from 'tests/data/user.data';
import { EventService } from 'event/event.service';

describe('UserController', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  describe('registerUser', () => {
    it('register test', async () => {
      {
        jest.spyOn(userService, 'registerUser').mockImplementation();
      }

      {
        expect(() =>
          userService.registerUser(new CreateUserModel()),
        ).toBeInstanceOf(Function);
      }
    });
  });

  describe('loginUser', () => {
    it('login test', async () => {
      {
        jest.spyOn(userService, 'loginUser').mockImplementation();
      }

      {
        userService.loginUser(new LoginUserModel());
        expect(() =>
          userService.loginUser(new LoginUserModel()),
        ).toBeInstanceOf(Function);
      }
    });
  });
});

describe('loginUser', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  it('should handle login correctly', async () => {
    {
      // Mock the dependencies or services
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUserDb);
      jest.spyOn(userService, 'hashPassword').mockReturnValue('hashedPassword');
      jest.spyOn(userService, 'createToken').mockResolvedValue('mockToken');
      jest.spyOn(EventService, 'logEventandTriggerBadge').mockResolvedValue();
    }

    {
      // Invoke the function being tested and Perform assertions
      const loginResult = await userService.loginUser(loginUserData);

      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          email: expect.any(String),
        },
      });

      expect(userService.hashPassword).toHaveBeenCalledTimes(1);
      expect(userService.hashPassword).toHaveBeenCalledWith(expect.any(String));

      expect(userService.createToken).toHaveBeenCalledTimes(1);
      expect(userService.createToken).toHaveBeenCalledWith(
        userId,
        PlatformEnum.MAKER,
      );

      expect(loginResult).toBe('mockToken');
    }
  });

  it('should throw NotFoundException if user does not exist', async () => {
    {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
    }

    {
      await expect(userService.loginUser(new LoginUserModel())).rejects.toThrow(
        NotFoundException,
      );
    }
  });

  it('should throw BadRequestException if wrong password is provided', async () => {
    {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUserDb);
      jest.spyOn(userService, 'hashPassword').mockReturnValue('wrongPassword');
    }

    {
      await expect(userService.loginUser(new LoginUserModel())).rejects.toThrow(
        BadRequestException,
      );
    }
  });
});

describe('getUser', () => {
  let userService: UserService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
  });

  it('should return the user data', async () => {
    {
      // Mock the dependencies or services
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUserDb);
    }

    {
      // Invoke the function being tested
      const result = await userService.getUser(context);

      // Perform assertions
      expect(prisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: {
          id: expect.any(String),
        },
      });

      expect(result).toEqual({
        firstname: mockUserDb.firstname,
        lastname: mockUserDb.lastname,
        email: mockUserDb.email,
      });
    }
  });

  it('should throw NotFoundException if user does not exist', async () => {
    {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
    }

    {
      await expect(userService.getUser(context)).rejects.toThrow(
        ConflictException,
      );
    }
  });

  it('should throw ConflictException if an error occurs', async () => {
    {
      jest
        .spyOn(prisma.user, 'findUnique')
        .mockRejectedValue(new Error('Some error'));
    }

    {
      await expect(userService.getUser(context)).rejects.toThrow(
        ConflictException,
      );
    }
  });
});
