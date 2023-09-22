import { UserRole, UserType } from '@prisma/client';

export type CurrentUser = {
  id: number;
  email: string;
  type: UserType;
  role: UserRole;
};

export type JwtUser = CurrentUser & {
  iat: number;
  exp: number;
};

export type JwtRefreshUser = CurrentUser & {
  iat: number;
  exp: number;
  refreshToken?: string;
};

export type TokenSecrets = {
  accessToken: string;
  refreshToken: string;
  hashedRefreshToken: string;
};
