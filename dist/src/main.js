"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_1 = require("./core/config");
const prisma_1 = require("./core/services/prisma");
const app_module_1 = require("./app.module");
const app_setup_1 = require("./app.setup");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: true,
    });
    (0, app_setup_1.setupVersioning)(app);
    (0, app_setup_1.setupSwagger)(app);
    app.enableCors({
        credentials: true,
        origin: '*',
    });
    const prismaService = app.get(prisma_1.PrismaService);
    prismaService.enableShutdownHooks(app);
    const configService = app.get(config_1.AppConfigService);
    console.log('STAGE: ', configService.STAGE);
    await app.listen(configService.PORT);
}
bootstrap().catch((err) => {
    console.error(err);
});
//# sourceMappingURL=main.js.map