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
exports.GetUsersFilter = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const date_range_filter_dto_1 = require("../../../core/dto/filters/global/date-range-filter.dto");
class GetUsersFilter {
    type;
    role;
    createdAtRange;
    static _OPENAPI_METADATA_FACTORY() {
        return { type: { required: false, type: () => Object }, role: { required: false, type: () => Object }, createdAtRange: { required: false, type: () => require("../../../core/dto/filters/global/date-range-filter.dto").DateRangeFilter } };
    }
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.UserType, enumName: 'UserType' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.UserType),
    __metadata("design:type", String)
], GetUsersFilter.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ enum: client_1.UserRole, enumName: 'UserRole' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.UserRole),
    __metadata("design:type", String)
], GetUsersFilter.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: date_range_filter_dto_1.DateRangeFilter,
    }),
    (0, class_transformer_1.Type)(() => date_range_filter_dto_1.DateRangeFilter),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", date_range_filter_dto_1.DateRangeFilter)
], GetUsersFilter.prototype, "createdAtRange", void 0);
exports.GetUsersFilter = GetUsersFilter;
//# sourceMappingURL=get-users-filter.dto.js.map