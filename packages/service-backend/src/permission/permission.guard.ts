import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  Role,
  PermissionUser,
  PermissionCourse,
  PermissionSection,
  PermissionLesson,
  UsertoCourse,
} from '@prisma/client';
import { PERMISSION_KEY, PermissionType, Method } from './permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const params = this.reflector.getAllAndOverride(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!params) {
      return true;
    }

    const type = params.type;
    const method = params.method;
    const requiredRoles = params.args;
    const role = context.switchToHttp().getRequest()
      .__userToCourse[0] as UsertoCourse;

    if (!role) {
      throw new UnauthorizedException('User is not enrolled in this course');
    }

    if (!Method[method]) {
      throw new Error('Invalid permission method');
    }

    switch (type) {
      case PermissionType.ROLE:
        return this.checkRole(role, method, requiredRoles as Role[]);
      case PermissionType.COURSE:
        return this.checkCourse(
          role,
          method,
          requiredRoles as PermissionCourse[],
        );
      case PermissionType.SECTION:
        return this.checkSection(
          role,
          method,
          requiredRoles as PermissionSection[],
        );
      case PermissionType.LESSON:
        return this.checkLesson(
          role,
          method,
          requiredRoles as PermissionLesson[],
        );
      case PermissionType.USER:
        return this.checkUser(role, method, requiredRoles as PermissionUser[]);
      default:
        throw new Error('Invalid permission type');
    }
  }

  equals(a: any, b: any): boolean {
    if (Array.isArray(a) && Array.isArray(b)) {
      a.sort();
      b.sort();
    }

    return JSON.stringify(a) === JSON.stringify(b);
  }

  checkRole(
    role: UsertoCourse,
    method: Method,
    requiredRoles: Role[],
  ): boolean {
    switch (method) {
      case Method.ALL:
        return this.equals(role.role_user, requiredRoles);
      case Method.ONE_OF:
        return requiredRoles.some((r) => role.role_user === r);
      default:
        throw new Error('Invalid permission method');
    }
  }

  checkCourse(
    role: UsertoCourse,
    method: Method,
    requiredRoles: PermissionCourse[],
  ): boolean {
    switch (method) {
      case Method.ALL:
        return this.equals(role.permission_course, requiredRoles);
      case Method.ONE_OF:
        return role.permission_course.some((r) => requiredRoles.includes(r));
      default:
        throw new Error('Invalid permission method');
    }
  }

  checkSection(
    role: UsertoCourse,
    method: Method,
    requiredRoles: PermissionSection[],
  ): boolean {
    switch (method) {
      case Method.ALL:
        return this.equals(role.permission_section, requiredRoles);
      case Method.ONE_OF:
        return role.permission_section.some((r) => requiredRoles.includes(r));
      default:
        throw new Error('Invalid permission method');
    }
  }

  checkLesson(
    role: UsertoCourse,
    method: Method,
    requiredRoles: PermissionLesson[],
  ): boolean {
    switch (method) {
      case Method.ALL:
        return this.equals(role.permission_lesson, requiredRoles);
      case Method.ONE_OF:
        return role.permission_lesson.some((r) => requiredRoles.includes(r));
      default:
        throw new Error('Invalid permission method');
    }
  }

  checkUser(
    role: UsertoCourse,
    method: Method,
    requiredRoles: PermissionUser[],
  ): boolean {
    switch (method) {
      case Method.ALL:
        return this.equals(role.permission_user, requiredRoles);
      case Method.ONE_OF:
        return role.permission_user.some((r) => requiredRoles.includes(r));
      default:
        throw new Error('Invalid permission method');
    }
  }
}
