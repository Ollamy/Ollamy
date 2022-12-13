import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

import { ROLES_KEY, Method } from './role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const params = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!params) {
      return true;
    }
    const method = params['method'];
    const requiredRoles = params['roles'];

    const role = context.switchToHttp().getRequest().__user.role;

    if (!role) {
      throw new UnauthorizedException();
    }

    if (method === Method.ALL) {
      return requiredRoles.every((requiredRole: Role) => role === requiredRole);
    } else if (method === Method.ONE_OF) {
      return requiredRoles.some((requiredRole: Role) => role === requiredRole);
    } else {
      throw new Error('Invalid method');
    }
    // unreachable
    return false;
  }
}
