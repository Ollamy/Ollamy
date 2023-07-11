import { Role, PermissionUser, PermissionCourse, PermissionSection, PermissionChapter, PermissionLesson } from '@prisma/client';
export declare const PERMISSION_KEY = "PERMISSION";
export declare enum Method {
    ALL = "ALL",
    ONE_OF = "ONE_OF"
}
export declare enum PermissionType {
    USER = "USER",
    ROLE = "ROLE",
    COURSE = "COURSE",
    SECTION = "SECTION",
    CHAPTER = "CHAPTER",
    LESSON = "LESSON"
}
export declare const AllowUser: (type: PermissionType, method: Method, ...args: Role[] | PermissionUser[] | PermissionCourse[] | PermissionSection[] | PermissionChapter[] | PermissionLesson[]) => import("@nestjs/common").CustomDecorator<string>;
