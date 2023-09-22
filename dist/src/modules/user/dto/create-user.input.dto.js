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
exports.CreateUserInputDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateUserInputDto {
    email;
    password;
    type;
    role;
    static _OPENAPI_METADATA_FACTORY() {
        return { email: { required: true, type: () => String }, password: { required: true, type: () => String }, type: { required: true, type: () => Object }, role: { required: true, type: () => Object } };
    }
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsLowercase)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserInputDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsStrongPassword)({
        minSymbols: 1,
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
    }),
    __metadata("design:type", String)
], CreateUserInputDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.UserType,
        enumName: 'UserType',
    }),
    (0, class_validator_1.IsEnum)(client_1.UserType),
    __metadata("design:type", String)
], CreateUserInputDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.UserRole,
        enumName: 'UserRole',
    }),
    (0, class_validator_1.IsEnum)(client_1.UserRole),
    __metadata("design:type", String)
], CreateUserInputDto.prototype, "role", void 0);
exports.CreateUserInputDto = CreateUserInputDto;
//# sourceMappingURL=create-user.input.dto.js.map