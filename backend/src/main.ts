import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from 'app.module';
import { BACKEND_PORT } from 'setup';
import * as fs from 'fs';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Ollamy API')
    .setDescription('So insane API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // save the swagger.json file
  fs.writeFileSync('./swagger.json', JSON.stringify(document));

  await app.listen(BACKEND_PORT);
}
bootstrap();
