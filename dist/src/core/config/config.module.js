"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const config_service_1 = require("./config.service");
const env_validation_1 = require("./env.validation");
let AppConfigModule = class AppConfigModule {
};
AppConfigModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: config_service_1.AppConfigService.isNeedEnv
                    ? `./env/.env.${String(process.env.STAGE ?? 'dev')}`
                    : undefined,
                ignoreEnvFile: !config_service_1.AppConfigService.isNeedEnv,
                validate: env_validation_1.validate,
            }),
        ],
        controllers: [],
        providers: [config_service_1.AppConfigService],
        exports: [config_service_1.AppConfigService],
    })
], AppConfigModule);
exports.AppConfigModule = AppConfigModule;
//# sourceMappingURL=config.module.js.map