"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const config_1 = require("./core/config");
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./core/services/prisma/prisma.module");
const core_1 = require("@nestjs/core");
const exception_filters_1 = require("./core/exception-filters");
const logger_middleware_1 = require("./core/middlewares/logger.middleware");
const transform_pipe_1 = require("./core/pipes/transform-pipe");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./modules/user/user.module");
const auth_module_1 = require("./modules/auth/auth.module");
const reddit_module_1 = require("./modules/reddit/reddit.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            config_1.AppConfigModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            reddit_module_1.RedditModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_PIPE,
                useFactory: () => new common_1.ValidationPipe({
                    transform: true,
                    whitelist: true,
                    forbidNonWhitelisted: true,
                }),
            },
            {
                provide: core_1.APP_FILTER,
                useClass: exception_filters_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_PIPE,
                useFactory: () => new transform_pipe_1.ParseJsonPipe(),
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useFactory: (reflector) => new common_1.ClassSerializerInterceptor(reflector, {
                    excludePrefixes: ['_'],
                }),
                inject: [core_1.Reflector],
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map