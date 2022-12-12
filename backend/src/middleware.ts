import { Injectable, NestMiddleware, Logger, ConflictException, UnprocessableEntityException, NotFoundException, BadRequestException, NotAcceptableException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { abort } from "process";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    use(req: Request, _: Response, next: NextFunction) {
        const token = req.headers.authorization;

        if (token === undefined) {
            Logger.error('No token provided');
            throw new NotAcceptableException('No token provided');
        }
        const parsedJwt = jwt.decode(token);

        console.log("Request Received");
        next();
    }
}