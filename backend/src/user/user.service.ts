import jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserModel } from './user.dto';
import prisma from 'client';
import { SECRET_KEY } from 'setup';

@Injectable()
export class UserService {
  validateEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  async hashPassword(password: string): Promise<string> {
    const utf8 = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((bytes) => bytes.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  }

  async postUser(userData: UserModel): Promise<string | null> {
    const isEmail = this.validateEmail(userData.Email);

    if (!isEmail) {
      return null;
    }

    const hashedPass = await this.hashPassword(userData.Password);

    try {
      const userDb = await prisma.user.create({
        data: {
          password: hashedPass,
          email: userData.Email,
          firstname: userData.Firstname,
          lastname: userData.Lastname,
          communities_id: [],
        },
      });
      const token = jwt.sign(
        {
          _id: userDb.id,
          firstname: userDb.firstname,
          lastname: userDb.lastname,
          email: userDb.email,
          password: userDb.password,
        },
        SECRET_KEY,
        {
          expiresIn: '2 weeks',
        },
      );
      return token;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
