"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.EnvironmentVariables = exports.Stage = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var Stage;
(function (Stage) {
    Stage["dev"] = "dev";
    Stage["test"] = "test";
    Stage["prod"] = "prod";
})(Stage = exports.Stage || (exports.Stage = {}));
class EnvironmentVariables {
    STAGE;
    PORT = '3003';
    DATABASE_URL;
    ACCESS_TOKEN_SECRET;
    REFRESH_TOKEN_SECRET;
    RESET_PASSWORD_TOKEN_SECRET;
}
__decorate([
    (0, class_validator_1.IsEnum)(Stage),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "STAGE", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", Object)
], EnvironmentVariables.prototype, "PORT", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "DATABASE_URL", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "ACCESS_TOKEN_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "REFRESH_TOKEN_SECRET", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EnvironmentVariables.prototype, "RESET_PASSWORD_TOKEN_SECRET", void 0);
exports.EnvironmentVariables = EnvironmentVariables;
function validate(config) {
    const validatedConfig = (0, class_transformer_1.plainToInstance)(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = (0, class_validator_1.validateSync)(validatedConfig, {
        skipMissingProperties: false,
    });
    if (errors.length > 0) {
        throw new Error(errors.toString());
    }
    return validatedConfig;
}
exports.validate = validate;
//# sourceMappingURL=env.validation.js.map