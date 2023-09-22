/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiQuery, getSchemaPath } from '@nestjs/swagger';

/**
 * The `FilterApiQuery` function is a TypeScript decorator that generates an OpenAPI query parameter
 * for filtering API requests based on a given model.
 * @param params - The `params` parameter is an object that contains the following properties:
 * @returns The `FilterApiQuery` function returns a method decorator.
 */
export const FilterApiQuery = <TModel extends Type<any>>(params: {
  name: string;
  model: TModel;
  required?: boolean;
}): MethodDecorator => {
  return applyDecorators(
    ApiExtraModels(params.model),
    ApiQuery({
      name: params.name,
      required: params.required ?? true,
      explode: false,
      type: 'object',
      content: {
        'application/json': {
          schema: {
            $ref: getSchemaPath(params.model),
          },
        },
      },
    }),
  );
};
