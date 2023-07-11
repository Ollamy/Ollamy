"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const jwt = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const client_1 = require("../client");
const setup_1 = require("../setup");
const pbkdf2 = require("pbkdf2");
const client_2 = require("@prisma/client");
let UserService = class UserService {
    createToken(id) {
        const token = jwt.sign({
            id,
        }, setup_1.SECRET_KEY, {
            expiresIn: '2 weeks',
        });
        if (!token) {
            common_1.Logger.error('Token not created !');
            throw new common_1.ConflictException('Token not created !');
        }
        return token;
    }
    hashPassword(password) {
        const hash = pbkdf2
            .pbkdf2Sync(password, setup_1.SECRET_KEY, this.randomIntByString(setup_1.SECRET_KEY), 64, 'sha512')
            .toString('base64');
        return hash;
    }
    randomIntByString(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        hash = (hash % 900000) + 100000;
        return Math.abs(hash);
    }
    async registerUser(userData) {
        userData.password = this.hashPassword(userData.password);
        try {
            const userDb = await client_1.default.user.create({
                data: Object.assign(Object.assign({}, userData), { communities_id: [] }),
            });
            return this.createToken(userDb.id);
        }
        catch (error) {
            common_1.Logger.error(error);
            if (error instanceof client_2.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.ConflictException('Email already exists !');
            }
            throw new common_1.ConflictException('User not created !');
        }
    }
    async loginUser(userData) {
        const userDb = await client_1.default.user.findUnique({
            where: {
                email: userData.email,
            },
        });
        if (!userDb) {
            common_1.Logger.error('User does not exists !');
            throw new common_1.NotFoundException('User does not exists !');
        }
        userData.password = this.hashPassword(userData.password);
        if (userData.password !== userDb.password) {
            common_1.Logger.error('Wrong password !');
            throw new common_1.BadRequestException('Wrong password !');
        }
        return this.createToken(userDb.id);
    }
    async getUser(ctx) {
        try {
            const userDb = await client_1.default.user.findUnique({
                where: {
                    id: ctx.__user.id,
                },
            });
            if (!userDb) {
                common_1.Logger.error('User does not exists !');
                throw new common_1.NotFoundException('User does not exists !');
            }
            return {
                firstname: userDb.firstname,
                lastname: userDb.lastname,
                email: userDb.email,
            };
        }
        catch (error) {
            common_1.Logger.error(error);
            throw new common_1.ConflictException('User not found !');
        }
    }
    async updateUser(userData, ctx) {
        try {
            userData.password = this.hashPassword(userData.password);
            const userDb = await client_1.default.user.update({
                where: {
                    id: ctx.__user.id,
                },
                data: userData,
            });
            return this.createToken(userDb.id);
        }
        catch (error) {
            common_1.Logger.error(error);
            if (error instanceof client_2.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.ConflictException('Email already exists !');
            }
            throw new common_1.ConflictException('User not created !');
        }
    }
    async deleteUser(ctx) {
        try {
            const userDb = await client_1.default.user.delete({
                where: {
                    id: ctx.__user.id,
                },
            });
            if (!userDb) {
                common_1.Logger.error('User does not exists !');
                throw new common_1.NotFoundException('User does not exists !');
            }
            return `User's ${ctx.__user.id} has been deleted.`;
        }
        catch (error) {
            common_1.Logger.error(error);
            if (error instanceof client_2.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.ConflictException('User already removed !');
            }
            throw new common_1.ConflictException('User not created !');
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map