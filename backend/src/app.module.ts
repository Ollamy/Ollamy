import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UserModule } from 'user/user.module';
import { LoggingMiddleware } from 'middleware';
import { UserController } from 'user/user.controller';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .exclude(
        { path: 'user/register', method: RequestMethod.POST },
        { path: 'user/login', method: RequestMethod.POST },
      )
      .forRoutes(UserController);
  }
}
