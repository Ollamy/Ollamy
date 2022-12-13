import { Module } from '@nestjs/common';
import { UserController } from 'user/user.controller';
import { UserService } from 'user/user.service';
import { PermissionGuard } from 'permission/permission.guard';
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
    {
      provide: 'APP_GUARD',
      useExisting: true,
      useClass: PermissionGuard,
    },
  ],
})
export class UserModule {}
