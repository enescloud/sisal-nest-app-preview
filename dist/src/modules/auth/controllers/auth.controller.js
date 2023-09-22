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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../services/auth.service");
const sign_up_input_dto_1 = require("../dto/sign-up.input.dto");
const auth_decorator_1 = require("../decorators/auth.decorator");
const request_user_decorator_1 = require("../decorators/request-user.decorator");
const sign_in_input_dto_1 = require("../dto/sign-in.input.dto");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    signUp(signUpInputDto) {
        return this.authService.signUp(signUpInputDto);
    }
    async signIn(signInInput, currentUser) {
        return this.authService.signIn(currentUser);
    }
};
__decorate([
    (0, common_1.Post)('/sign-up'),
    openapi.ApiResponse({ status: 201, type: require("../dto/sign-up.response.dto").SignUpResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_input_dto_1.SignUpInputDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, auth_decorator_1.Auth)({
        strategy: 'local',
    }),
    (0, common_1.Post)('sign-in'),
    openapi.ApiResponse({ status: 201, type: require("../dto/sign-in.response.dto").SignInResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, request_user_decorator_1.RequestUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_in_input_dto_1.SignInInputDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)({
        version: '1',
        path: 'auth',
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map