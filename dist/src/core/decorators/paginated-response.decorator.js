"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiPaginatedResponse = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const page_options_input_1 = require("../entities/pagination/page-options.input");
const pagination_response_1 = require("../entities/pagination/pagination.response");
const filter_api_query_decorator_1 = require("./filter-api-query.decorator");
const ApiPaginatedResponse = (model) => {
    return (0, common_1.applyDecorators)((0, filter_api_query_decorator_1.FilterApiQuery)({
        name: 'pageOptions',
        model: page_options_input_1.PageOptionsInput,
        required: false,
    }), (0, swagger_1.ApiExtraModels)(pagination_response_1.PaginationResponse), (0, swagger_1.ApiExtraModels)(model), (0, swagger_1.ApiOkResponse)({
        description: 'Successfully received model list',
        schema: {
            title: `PaginatedResponseOf${model.name}`,
            allOf: [
                {
                    $ref: (0, swagger_1.getSchemaPath)(pagination_response_1.PaginationResponse),
                },
                {
                    properties: {
                        data: {
                            type: 'array',
                            items: { $ref: (0, swagger_1.getSchemaPath)(model) },
                        },
                    },
                },
            ],
        },
    }));
};
exports.ApiPaginatedResponse = ApiPaginatedResponse;
//# sourceMappingURL=paginated-response.decorator.js.map