import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';
export enum Method {
  ALL = 'ALL',
  ONE_OF = 'ONE_OF',
}
export const Roles = (method: Method = Method.ALL, ...roles: Role[]) =>
  SetMetadata(ROLES_KEY, { method, roles });
