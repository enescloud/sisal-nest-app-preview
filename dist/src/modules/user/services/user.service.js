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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const page_meta_dto_1 = require("../../../core/entities/pagination/page-meta.dto");
const pagination_response_1 = require("../../../core/entities/pagination/pagination.response");
const string_utils_1 = require("../../../core/utils/string.utils");
const user_repository_1 = require("../repositories/user.repository");
const user_response_dto_1 = require("../dto/user.response.dto");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        return new user_response_dto_1.UserResponseDto(await this.userRepository.create({
            ...createUserDto,
            password: await string_utils_1.StringUtils.hashString(createUserDto.password),
            isDeleted: false,
        }));
    }
    async findById(id) {
        return new user_response_dto_1.UserResponseDto(await this.userRepository.findById(id));
    }
    async findByEmailToValidate(email) {
        return this.userRepository.findByEmail(email);
    }
    async findMany(filter, pageOptionsInput) {
        const where = {
            type: filter.type,
            role: filter.role,
            createdAt: {
                gte: filter.createdAtRange?.from,
                lte: filter.createdAtRange?.to,
            },
        };
        const [items, itemCount] = await Promise.all([
            this.userRepository.findMany(where, pageOptionsInput),
            this.userRepository.count(where),
        ]);
        const pageMeta = new page_meta_dto_1.PageMeta({
            itemCount,
            pageOptionsInput,
        });
        return new pagination_response_1.PaginationResponse(items.map((item) => {
            return new user_response_dto_1.UserResponseDto(item);
        }), pageMeta);
    }
    async updateById(id, data) {
        await this.userRepository.findById(id);
        return new user_response_dto_1.UserResponseDto(await this.userRepository.updateById({ id }, data));
    }
    async deleteById(id) {
        await this.userRepository.deleteById(id);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map