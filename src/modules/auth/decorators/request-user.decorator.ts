/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/* The code is creating a custom decorator called `RequestUser`. Decorators in NestJS are used to
modify or extend the behavior of classes, methods, or properties. */
export const RequestUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
