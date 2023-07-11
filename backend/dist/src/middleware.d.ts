import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
export declare class LoggingMiddleware implements NestMiddleware {
    use(req: Request, _: Response, next: NextFunction): void;
}
