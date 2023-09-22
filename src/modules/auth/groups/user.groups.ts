/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable max-classes-per-file */

import { UserRole, UserType } from '@prisma/client';

export const userTypeGroups: { [key in UserType]: string } = {
  admin: 'type:admin',
  user: 'type:user',
};

export const userRoleGroups: { [key in UserRole]: string } = {
  admin_superAdmin: 'role:admin_superAdmin',
  user_member: 'role:user_member',
};
