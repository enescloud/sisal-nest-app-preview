"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = exports.userArgs = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const user_entity_1 = require("../entities/user.entity");
exports.userArgs = client_1.Prisma.validator()({
    select: {
        id: true,
        email: true,
        type: true,
        role: true,
        isDeleted: true,
        createdAt: true,
    },
});
const properties = [
    'id',
    'email',
    'type',
    'role',
    'isDeleted',
    'createdAt',
];
class UserResponseDto extends (0, swagger_1.PickType)(user_entity_1.UserEntity, properties) {
    constructor(user) {
        super();
        const partial = (0, lodash_1.pick)(user, properties);
        Object.assign(this, partial);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UserResponseDto = UserResponseDto;
//# sourceMappingURL=user.response.dto.js.map