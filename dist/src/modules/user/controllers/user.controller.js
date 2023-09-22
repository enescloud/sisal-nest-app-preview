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
exports.UserController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const paginated_response_decorator_1 = require("../../../core/decorators/paginated-response.decorator");
const page_options_input_1 = require("../../../core/entities/pagination/page-options.input");
const filter_api_query_decorator_1 = require("../../../core/decorators/filter-api-query.decorator");
const auth_decorator_1 = require("../../auth/decorators/auth.decorator");
const user_response_dto_1 = require("../dto/user.response.dto");
const update_user_input_1 = require("../dto/update-user.input");
const create_user_input_dto_1 = require("../dto/create-user.input.dto");
const user_service_1 = require("../services/user.service");
const get_users_filter_dto_1 = require("../dto/get-users-filter.dto");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    getUsers(filter, pageOptionsInput) {
        return this.userService.findMany(filter, pageOptionsInput);
    }
    getUser(id) {
        return this.userService.findById(id);
    }
    create(createUserDto) {
        return this.userService.create(createUserDto);
    }
    updateById(id, updateUserDto) {
        return this.userService.updateById(id, updateUserDto);
    }
    delete(id) {
        return this.userService.deleteById(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, auth_decorator_1.Auth)({
        userType: [client_1.UserType.admin],
    }),
    (0, filter_api_query_decorator_1.FilterApiQuery)({
        name: 'filter',
        model: get_users_filter_dto_1.GetUsersFilter,
    }),
    (0, paginated_response_decorator_1.ApiPaginatedResponse)(user_response_dto_1.UserResponseDto),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('filter')),
    __param(1, (0, common_1.Query)('pageOptions')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_users_filter_dto_1.GetUsersFilter,
        page_options_input_1.PageOptionsInput]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, auth_decorator_1.Auth)({
        userType: [client_1.UserType.admin, client_1.UserType.user],
    }),
    openapi.ApiResponse({ status: 200, type: require("../dto/user.response.dto").UserResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, auth_decorator_1.Auth)({
        userType: [client_1.UserType.admin],
    }),
    openapi.ApiResponse({ status: 201, type: require("../dto/user.response.dto").UserResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_dto_1.CreateUserInputDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, auth_decorator_1.Auth)({
        userType: [client_1.UserType.admin, client_1.UserType.user],
    }),
    openapi.ApiResponse({ status: 200, type: require("../dto/user.response.dto").UserResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_user_input_1.UpdateUserInputDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, auth_decorator_1.Auth)({
        userType: [client_1.UserType.admin],
    }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)({
        version: '1',
        path: 'users',
    }),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map