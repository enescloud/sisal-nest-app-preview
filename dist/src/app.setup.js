"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupVersioning = exports.setupSwagger = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function setupSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Sisal Nest App')
        .setDescription('Nest Prisma Mysql Rest API Documentation')
        .setVersion('1.0')
        .addBearerAuth({
        type: 'http',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    const outputPath = path_1.default.resolve(process.cwd(), 'docs/swagger.json');
    (0, fs_1.writeFileSync)(outputPath, JSON.stringify(document), { encoding: 'utf8' });
}
exports.setupSwagger = setupSwagger;
function setupVersioning(app) {
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: '1',
    });
}
exports.setupVersioning = setupVersioning;
//# sourceMappingURL=app.setup.js.map