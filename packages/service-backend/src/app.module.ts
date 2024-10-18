import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UserModule } from 'user/user.module';
import { CourseModule } from 'course/course.module';
import { SectionModule } from 'section/section.module';
import { LessonModule } from 'lesson/lesson.module';
import { QuestionModule } from 'question/question.module';
import { AnswerModule } from './answer/answer.module';
import { MiddlewareGuard } from 'middleware/middleware.guard';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { PictureModule } from './picture/picture.module';
import { ChatGateway } from './chat/chat.gateway';
import { LectureModule } from './lecture/lecture.module';
import { AiModule } from './ai/ai.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MobileAppModule } from './mobileApp/mobileApp.module';
import { BadgeModule } from './badge/badge.module';
import { StripeModule } from './stripe/stripe.module';
import { SessionModule } from './session/session.module';
import { StatisticModule } from './statistic/statistic.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    UserModule,
    CourseModule,
    SectionModule,
    LessonModule,
    QuestionModule,
    AnswerModule,
    PictureModule,
    LectureModule,
    MobileAppModule,
    BadgeModule,
    AiModule,
    StripeModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
    SessionModule,
    StatisticModule,
    EventModule,
  ],
  controllers: [AppController, AlertController],
  providers: [
    AppService,
    AlertGateway,
    ChatGateway,
    {
      provide: 'APP_GUARD',
      useExisting: true,
      useClass: MiddlewareGuard,
    },
  ],
})
export class AppModule {}
