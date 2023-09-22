"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterApiQuery = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const FilterApiQuery = (params) => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiExtraModels)(params.model), (0, swagger_1.ApiQuery)({
        name: params.name,
        required: params.required ?? true,
        explode: false,
        type: 'object',
        content: {
            'application/json': {
                schema: {
                    $ref: (0, swagger_1.getSchemaPath)(params.model),
                },
            },
        },
    }));
};
exports.FilterApiQuery = FilterApiQuery;
//# sourceMappingURL=filter-api-query.decorator.js.map