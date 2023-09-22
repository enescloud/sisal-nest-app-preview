"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpResponseDto = exports.userArgs = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const user_entity_1 = require("../../user/entities/user.entity");
exports.userArgs = client_1.Prisma.validator()({
    select: {
        id: true,
        email: true,
        type: true,
        role: true,
        createdAt: true,
    },
});
const properties = [
    'id',
    'email',
    'type',
    'role',
    'createdAt',
];
class SignUpResponseDto extends (0, swagger_1.PickType)(user_entity_1.UserEntity, properties) {
    constructor(user) {
        super();
        const partial = (0, lodash_1.pick)(user, properties);
        Object.assign(this, partial);
    }
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.SignUpResponseDto = SignUpResponseDto;
//# sourceMappingURL=sign-up.response.dto.js.map