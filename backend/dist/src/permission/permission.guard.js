"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const permission_decorator_1 = require("./permission.decorator");
let PermissionGuard = class PermissionGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        const params = this.reflector.getAllAndOverride(permission_decorator_1.PERMISSION_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!params) {
            return true;
        }
        const type = params['type'];
        const method = params['method'];
        const requiredRoles = params['args'];
        const role = context.switchToHttp().getRequest()
            .__userToCourse[0];
        if (!role) {
            throw new common_1.UnauthorizedException('User is not enrolled in this course');
        }
        if (!permission_decorator_1.Method[method]) {
            throw new Error('Invalid permission method');
        }
        switch (type) {
            case permission_decorator_1.PermissionType.ROLE:
                return this.checkRole(role, method, requiredRoles);
            case permission_decorator_1.PermissionType.COURSE:
                return this.checkCourse(role, method, requiredRoles);
            case permission_decorator_1.PermissionType.SECTION:
                return this.checkSection(role, method, requiredRoles);
            case permission_decorator_1.PermissionType.CHAPTER:
                return this.checkChapter(role, method, requiredRoles);
            case permission_decorator_1.PermissionType.LESSON:
                return this.checkLesson(role, method, requiredRoles);
            case permission_decorator_1.PermissionType.USER:
                return this.checkUser(role, method, requiredRoles);
            default:
                throw new Error('Invalid permission type');
        }
    }
    equals(a, b) {
        if (Array.isArray(a) && Array.isArray(b)) {
            a.sort();
            b.sort();
        }
        return JSON.stringify(a) === JSON.stringify(b);
    }
    checkRole(role, method, requiredRoles) {
        switch (method) {
            case permission_decorator_1.Method.ALL:
                return this.equals(role.role_user, requiredRoles);
            case permission_decorator_1.Method.ONE_OF:
                return requiredRoles.some((r) => role.role_user === r);
            default:
                throw new Error('Invalid permission method');
        }
    }
    checkCourse(role, method, requiredRoles) {
        switch (method) {
            case permission_decorator_1.Method.ALL:
                return this.equals(role.permission_course, requiredRoles);
            case permission_decorator_1.Method.ONE_OF:
                return role.permission_course.some((r) => requiredRoles.includes(r));
            default:
                throw new Error('Invalid permission method');
        }
    }
    checkSection(role, method, requiredRoles) {
        switch (method) {
            case permission_decorator_1.Method.ALL:
                return this.equals(role.permission_section, requiredRoles);
            case permission_decorator_1.Method.ONE_OF:
                return role.permission_section.some((r) => requiredRoles.includes(r));
            default:
                throw new Error('Invalid permission method');
        }
    }
    checkChapter(role, method, requiredRoles) {
        switch (method) {
            case permission_decorator_1.Method.ALL:
                return this.equals(role.permission_chapter, requiredRoles);
            case permission_decorator_1.Method.ONE_OF:
                return role.permission_chapter.some((r) => requiredRoles.includes(r));
            default:
                throw new Error('Invalid permission method');
        }
    }
    checkLesson(role, method, requiredRoles) {
        switch (method) {
            case permission_decorator_1.Method.ALL:
                return this.equals(role.permission_lesson, requiredRoles);
            case permission_decorator_1.Method.ONE_OF:
                return role.permission_lesson.some((r) => requiredRoles.includes(r));
            default:
                throw new Error('Invalid permission method');
        }
    }
    checkUser(role, method, requiredRoles) {
        switch (method) {
            case permission_decorator_1.Method.ALL:
                return this.equals(role.permission_user, requiredRoles);
            case permission_decorator_1.Method.ONE_OF:
                return role.permission_user.some((r) => requiredRoles.includes(r));
            default:
                throw new Error('Invalid permission method');
        }
    }
};
PermissionGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PermissionGuard);
exports.PermissionGuard = PermissionGuard;
//# sourceMappingURL=permission.guard.js.map