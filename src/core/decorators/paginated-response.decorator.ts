/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PageOptionsInput } from '@core/entities/pagination/page-options.input';
import { PaginationResponse } from '@core/entities/pagination/pagination.response';
import { FilterApiQuery } from './filter-api-query.decorator';

/**
 * The function `ApiPaginatedResponse` is a TypeScript decorator that adds pagination support to an API
 * response for a given model.
 * @param {TModel} model - The `model` parameter is the type of the model that will be returned in the
 * paginated response. It is a generic type `TModel` that extends `Type<any>`, which means it can be
 * any type.
 * @returns The `ApiPaginatedResponse` function returns a method decorator.
 */
export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
): MethodDecorator => {
  return applyDecorators(
    FilterApiQuery({
      name: 'pageOptions',
      model: PageOptionsInput,
      required: false,
    }),
    ApiExtraModels(PaginationResponse),
    ApiExtraModels(model),
    ApiOkResponse({
      description: 'Successfully received model list',
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          {
            $ref: getSchemaPath(PaginationResponse),
          },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
