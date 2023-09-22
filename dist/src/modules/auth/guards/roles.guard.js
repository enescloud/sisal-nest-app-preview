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
exports.RolesGuard = exports.USER_TYPE_KEY = exports.USER_ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
exports.USER_ROLES_KEY = 'user_roles';
exports.USER_TYPE_KEY = 'user_type';
let RolesGuard = class RolesGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const requiredTypes = this.reflector.getAllAndOverride(exports.USER_TYPE_KEY, [context.getHandler(), context.getClass()]);
        const requiredRoles = this.reflector.getAllAndOverride(exports.USER_ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!requiredTypes && !requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        if (!user) {
            return false;
        }
        let hasTypePermission = true;
        let hasRolePermission = true;
        if (requiredTypes) {
            hasTypePermission = requiredTypes.includes(user.type);
        }
        if (requiredRoles) {
            hasRolePermission = requiredRoles.some((role) => role === user.role);
        }
        return hasTypePermission && hasRolePermission;
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map