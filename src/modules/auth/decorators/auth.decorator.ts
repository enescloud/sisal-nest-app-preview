/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-param-reassign */

import {
  SerializeOptions,
  SetMetadata,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserRole, UserType } from '@prisma/client';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { JwtRefreshAuthGuard } from '../guards/jwt-refresh-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import {
  RolesGuard,
  USER_ROLES_KEY,
  USER_TYPE_KEY,
} from '../guards/roles.guard';

/**
 * The `Auth` function is a TypeScript decorator that applies authentication guards and metadata
 * decorators based on the provided parameters.
 * @param [params] - - strategy: The authentication strategy to be used. It can be one of the following
 * values: 'local', 'jwt', 'jwt-refresh', 'jwt-reset-password', 'jwt-verify-email'.
 * @returns the result of the `applyDecorators` function, which is a MethodDecorator.
 */
export function Auth(params?: {
  strategy?:
    | 'local'
    | 'jwt'
    | 'jwt-refresh'
    | 'jwt-reset-password'
    | 'jwt-verify-email';
  userType?: UserType[];
  userRole?: UserRole;
}): MethodDecorator {
  params ??= {
    strategy: 'jwt',
  };
  if (!params.strategy) {
    params.strategy = 'jwt';
  }
  const { strategy, userType, userRole } = params;

  const decorators = [];
  const guards = [];
  const groups: string[] = [];

  if (strategy === 'local') {
    guards.push(LocalAuthGuard);
  } else if (strategy === 'jwt-refresh') {
    guards.push(JwtRefreshAuthGuard);
    decorators.push(ApiBearerAuth());
  } else {
    guards.push(JwtAuthGuard);
    decorators.push(ApiBearerAuth());
  }
  if (userType) {
    decorators.push(SetMetadata(USER_TYPE_KEY, userType));
    groups.push(`type:${String(userType)}`);
  }
  if (userRole) {
    decorators.push(SetMetadata(USER_ROLES_KEY, userRole));
    groups.push(`role:${String(userRole)}`);
  }
  if (userType || userRole) {
    guards.push(RolesGuard);
  }

  decorators.push(UseGuards(...guards));
  decorators.push(
    SerializeOptions({
      groups,
    }),
  );

  return applyDecorators(...decorators);
}
