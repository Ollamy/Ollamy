import { createUser } from './models/user';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


// createUser("totowolf", "1234");