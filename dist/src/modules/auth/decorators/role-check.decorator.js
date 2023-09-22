"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleCheck = exports.RoleCheckConstraint = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
let RoleCheckConstraint = class RoleCheckConstraint {
    validate(value, args) {
        const [userType] = args.constraints;
        const role = args.object[args.property];
        switch (userType) {
            case client_1.UserType.admin:
                return role === client_1.UserRole.admin_superAdmin;
            case client_1.UserType.user:
                return role === client_1.UserRole.user_member;
            default:
                return false;
        }
    }
    defaultMessage() {
        return 'Invalid role(s)';
    }
};
RoleCheckConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'RoleCheck' })
], RoleCheckConstraint);
exports.RoleCheckConstraint = RoleCheckConstraint;
function RoleCheck(property, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: {
                ...validationOptions,
            },
            constraints: [property],
            validator: RoleCheckConstraint,
        });
    };
}
exports.RoleCheck = RoleCheck;
//# sourceMappingURL=role-check.decorator.js.map