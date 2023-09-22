"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
const jwt_refresh_auth_guard_1 = require("../guards/jwt-refresh-auth.guard");
const local_auth_guard_1 = require("../guards/local-auth.guard");
const roles_guard_1 = require("../guards/roles.guard");
function Auth(params) {
    params ??= {
        strategy: 'jwt',
    };
    if (!params.strategy) {
        params.strategy = 'jwt';
    }
    const { strategy, userType, userRole } = params;
    const decorators = [];
    const guards = [];
    const groups = [];
    if (strategy === 'local') {
        guards.push(local_auth_guard_1.LocalAuthGuard);
    }
    else if (strategy === 'jwt-refresh') {
        guards.push(jwt_refresh_auth_guard_1.JwtRefreshAuthGuard);
        decorators.push((0, swagger_1.ApiBearerAuth)());
    }
    else {
        guards.push(jwt_auth_guard_1.JwtAuthGuard);
        decorators.push((0, swagger_1.ApiBearerAuth)());
    }
    if (userType) {
        decorators.push((0, common_1.SetMetadata)(roles_guard_1.USER_TYPE_KEY, userType));
        groups.push(`type:${String(userType)}`);
    }
    if (userRole) {
        decorators.push((0, common_1.SetMetadata)(roles_guard_1.USER_ROLES_KEY, userRole));
        groups.push(`role:${String(userRole)}`);
    }
    if (userType || userRole) {
        guards.push(roles_guard_1.RolesGuard);
    }
    decorators.push((0, common_1.UseGuards)(...guards));
    decorators.push((0, common_1.SerializeOptions)({
        groups,
    }));
    return (0, common_1.applyDecorators)(...decorators);
}
exports.Auth = Auth;
//# sourceMappingURL=auth.decorator.js.map