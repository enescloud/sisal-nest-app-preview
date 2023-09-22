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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcryptjs_1 = require("bcryptjs");
const ms_1 = __importDefault(require("ms"));
const config_1 = require("../../../core/config");
const client_1 = require("@prisma/client");
const string_utils_1 = require("../../../core/utils/string.utils");
const user_service_1 = require("../../user/services/user.service");
const constants_1 = require("../constants");
const sign_up_response_dto_1 = require("../dto/sign-up.response.dto");
const sign_in_response_dto_1 = require("../dto/sign-in.response.dto");
let AuthService = AuthService_1 = class AuthService {
    configService;
    jwtService;
    userService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(configService, jwtService, userService) {
        this.configService = configService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async signUp(signUpInputDto) {
        try {
            const user = await this.userService.create({
                ...signUpInputDto,
                role: client_1.UserRole.user_member,
                type: client_1.UserType.user,
            });
            return new sign_up_response_dto_1.SignUpResponseDto(user);
        }
        catch (e) {
            this.logger.error(`Error in AuthService.signUp: `, e);
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002') {
                throw new common_1.ConflictException('User with this email already exists');
            }
            throw e;
        }
    }
    async signIn(currentUser) {
        const tokenSecrets = await this.generateTokens(currentUser);
        await this.userService
            .updateById(currentUser.id, {
            refreshToken: {
                upsert: {
                    create: {
                        token: tokenSecrets.hashedRefreshToken,
                        expiresAt: new Date(Date.now() + constants_1.AuthConstants.refreshTokenExpiresIn),
                    },
                    update: {
                        token: tokenSecrets.hashedRefreshToken,
                        expiresAt: new Date(Date.now() + constants_1.AuthConstants.refreshTokenExpiresIn),
                    },
                },
            },
            lastLoginDate: new Date(Date.now()),
        })
            .catch((e) => {
            this.logger.error(`Error in AuthService.signIn: `, e);
            throw new common_1.BadRequestException('Could not update user');
        });
        return new sign_in_response_dto_1.SignInResponseDto({
            accessToken: tokenSecrets.accessToken,
            refreshToken: tokenSecrets.refreshToken,
            expiresAt: new Date(Date.now() + constants_1.AuthConstants.accessTokenExpiresIn),
        });
    }
    async validateUser(email, pass) {
        const user = await this.userService.findByEmailToValidate(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password!');
        }
        if (!(await (0, bcryptjs_1.compare)(pass, user.password))) {
            this.logger.warn('Detected login attempt with invalid password user: ', user);
            throw new common_1.UnauthorizedException('Invalid email or password!');
        }
        if (user.isDeleted) {
            this.logger.warn('Detected deleted user login attempt: ', user);
            throw new common_1.ForbiddenException('User is deleted.');
        }
        return {
            id: user.id,
            email: user.email,
            type: user.type,
            role: user.role,
        };
    }
    async generateTokens(user) {
        const accessToken = await this.jwtService
            .signAsync(user, {
            secret: this.configService.get('ACCESS_TOKEN_SECRET'),
            expiresIn: (0, ms_1.default)(constants_1.AuthConstants.accessTokenExpiresIn),
        })
            .catch((e) => {
            this.logger.error(`Error in AuthService.generateTokens: `, e);
            throw new Error(`Could not generate access token`);
        });
        const refreshToken = await this.jwtService
            .signAsync(user, {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
            expiresIn: (0, ms_1.default)(constants_1.AuthConstants.refreshTokenExpiresIn),
        })
            .catch((e) => {
            this.logger.error(`Error in AuthService.refreshTokens: `, e);
            throw new Error(`Could not generate refresh token`);
        });
        const hashedRefreshToken = await string_utils_1.StringUtils.hashString(refreshToken);
        return {
            accessToken,
            refreshToken,
            hashedRefreshToken,
        };
    }
};
AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.AppConfigService,
        jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map