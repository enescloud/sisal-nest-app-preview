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
var UserRepository_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const prisma_1 = require("../../../core/services/prisma");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let UserRepository = UserRepository_1 = class UserRepository {
    prismaService;
    logger = new common_1.Logger(UserRepository_1.name);
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(data) {
        try {
            const user = await this.prismaService.user.create({ data });
            return user;
        }
        catch (e) {
            if (e instanceof client_1.Prisma.PrismaClientKnownRequestError &&
                e.code === 'P2002') {
                throw new common_1.ConflictException('User with this email already exist');
            }
            throw e;
        }
    }
    async updateById(where, data) {
        return this.prismaService.user.update({ data, where }).catch((e) => {
            this.logger.error('Update failed', e);
            throw new common_1.ConflictException('Update failed');
        });
    }
    async deleteById(id) {
        await this.prismaService.user
            .delete({
            where: { id },
        })
            .catch((e) => {
            this.logger.error('Delete failed', e);
            throw new common_1.ConflictException('Update failed');
        });
    }
    async findById(id) {
        return this.prismaService.user.findUniqueOrThrow({ where: { id } });
    }
    async findByEmail(email) {
        return this.prismaService.user.findUniqueOrThrow({ where: { email } });
    }
    async findMany(where, pageOptionsInput) {
        const { skip, take, orderBy, orderDirection } = pageOptionsInput;
        return this.prismaService.user
            .findMany({
            where,
            skip,
            take,
            orderBy: {
                [orderBy]: orderDirection,
            },
        })
            .catch((e) => {
            this.logger.error('findMany failed', e);
            throw new common_1.ConflictException('Error while fetching users');
        });
    }
    async count(where) {
        return this.prismaService.user.count({ where }).catch((e) => {
            this.logger.error('count failed', e);
            throw new common_1.ConflictException('Error while counting users');
        });
    }
};
UserRepository = UserRepository_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_1.PrismaService])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map