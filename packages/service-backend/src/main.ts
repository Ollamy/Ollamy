import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from 'app.module';
import { BACKEND_PORT, FRONTEND_URL, FRONTEND_PORT, MODE } from 'setup';
import { writeFileSync } from 'fs';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import RedisCacheService from 'redis/redis.service';

function buildSwagger(
  app: INestApplication,
  config: Omit<OpenAPIObject, 'paths'>,
) {
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  writeFileSync('./swagger.json', JSON.stringify(document));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Ollamy API')
    .setDescription('So insane API')
    .setVersion('1.0')
    .build();

  if (MODE === 'dev') {
    app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
    buildSwagger(app, config);
    Logger.debug(`Swagger available at http://localhost:${BACKEND_PORT}/api`);
  }

  await RedisCacheService.connect();
  Logger.debug('Redis Connected!');

  app.enableCors({
    origin: [`${FRONTEND_URL}:${FRONTEND_PORT}`],
    credentials: true,
    allowedHeaders: '*',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(BACKEND_PORT);
}

bootstrap();
