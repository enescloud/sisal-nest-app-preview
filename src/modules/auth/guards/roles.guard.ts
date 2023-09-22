/* eslint-disable @typescript-eslint/no-unsafe-call */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole, UserType } from '@prisma/client';

import { CurrentUser } from '../types/types';

export const USER_ROLES_KEY = 'user_roles';
export const USER_TYPE_KEY = 'user_type';

@Injectable()
/* The `RolesGuard` class is a TypeScript implementation of a guard that checks if a user has the
required user types and roles to access a specific route. */
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredTypes = this.reflector.getAllAndOverride<UserType[]>(
      USER_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    );
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      USER_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
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
      hasTypePermission = requiredTypes.includes((user as CurrentUser).type);
    }
    if (requiredRoles) {
      hasRolePermission = requiredRoles.some(
        (role) => role === (user as CurrentUser).role,
      );
    }
    return hasTypePermission && hasRolePermission;
  }
}
