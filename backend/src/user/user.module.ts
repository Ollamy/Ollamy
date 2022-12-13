import { Module } from '@nestjs/common';
import { UserController } from 'user/user.controller';
import { UserService } from 'user/user.service';
import { MiddlewareGuard } from 'middleware/middleware.guard';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'APP_GUARD',
      useExisting: true,
      useClass: MiddlewareGuard,
    },
  ],
})
export class UserModule {}
