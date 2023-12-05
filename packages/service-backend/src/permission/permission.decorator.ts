import { SetMetadata } from '@nestjs/common';
import {
  Role,
  PermissionUser,
  PermissionCourse,
  PermissionSection,
  PermissionLesson,
} from '@prisma/client';

export const PERMISSION_KEY = 'PERMISSION';
export enum Method {
  ALL = 'ALL',
  ONE_OF = 'ONE_OF',
}

export enum PermissionType {
  USER = 'USER',
  ROLE = 'ROLE',
  COURSE = 'COURSE',
  SECTION = 'SECTION',
  CHAPTER = 'CHAPTER',
  LESSON = 'LESSON',
}

export const AllowUser = (
  type: PermissionType,
  method: Method,
  ...args:
    | Role[]
    | PermissionUser[]
    | PermissionCourse[]
    | PermissionSection[]
    | PermissionLesson[]
) => SetMetadata(PERMISSION_KEY, { type, method, args });
