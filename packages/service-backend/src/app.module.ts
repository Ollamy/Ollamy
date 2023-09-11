import { Module } from '@nestjs/common';
import { AppController } from 'app.controller';
import { AppService } from 'app.service';
import { UserModule } from 'user/user.module';
import { CourseModule } from 'course/course.module';
import { SectionModule } from 'section/section.module';
import { ChapterModule } from 'chapter/chapter.module';
import { LessonModule } from 'lesson/lesson.module';
import { QuestionModule } from 'question/question.module';
import { MiddlewareGuard } from 'middleware/middleware.guard';
import { AlertGateway } from './alert/alert.gateway';
import { AlertController } from './alert/alert.controller';
import { ChatGateway } from './chat/chat.gateway';

@Module({
  imports: [
    UserModule,
    CourseModule,
    SectionModule,
    ChapterModule,
    LessonModule,
    QuestionModule,
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
