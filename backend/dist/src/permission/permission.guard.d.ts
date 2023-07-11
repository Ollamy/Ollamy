import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, PermissionUser, PermissionCourse, PermissionSection, PermissionChapter, PermissionLesson, UsertoCourse } from '@prisma/client';
import { Method } from './permission.decorator';
export declare class PermissionGuard implements CanActivate {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    equals(a: any, b: any): boolean;
    checkRole(role: UsertoCourse, method: Method, requiredRoles: Role[]): boolean;
    checkCourse(role: UsertoCourse, method: Method, requiredRoles: PermissionCourse[]): boolean;
    checkSection(role: UsertoCourse, method: Method, requiredRoles: PermissionSection[]): boolean;
    checkChapter(role: UsertoCourse, method: Method, requiredRoles: PermissionChapter[]): boolean;
    checkLesson(role: UsertoCourse, method: Method, requiredRoles: PermissionLesson[]): boolean;
    checkUser(role: UsertoCourse, method: Method, requiredRoles: PermissionUser[]): boolean;
}
