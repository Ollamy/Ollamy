"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const setup_1 = require("./setup");
const fs_1 = require("fs");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
function buildSwagger(app, config) {
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    (0, fs_1.writeFileSync)('./swagger.json', JSON.stringify(document));
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ollamy API')
        .setDescription('So insane API')
        .setVersion('1.0')
        .build();
    if (setup_1.MODE === 'dev') {
        app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
        buildSwagger(app, config);
        common_2.Logger.debug(`Swagger available at http://localhost:${setup_1.BACKEND_PORT}/api`);
    }
    app.enableCors({
        origin: [`${setup_1.FRONTEND_URL}:${setup_1.FRONTEND_PORT}`],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        stopAtFirstError: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    await app.listen(setup_1.BACKEND_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map