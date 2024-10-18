import { LoginUserModel, PlatformEnum } from 'user/user.dto';
import { User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

// data

export const userId = uuidv4();

export const loginUserData: LoginUserModel = {
  email: 'test@example.com',
  password: 'hashedPassword',
  platform: PlatformEnum.MAKER,
};

export const context = {
  __user: {
    id: uuidv4(),
  },
  __device: {
    isMaker: true,
  },
};

// mock

export const mockUserDb: User = {
  id: userId,
  email: loginUserData.email,
  password: loginUserData.password,
  firstname: 'test',
  lastname: 'test',
  communities_id: ['2'],
};
