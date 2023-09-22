import { UserRole, UserType } from '@prisma/client';
export declare function Auth(params?: {
    strategy?: 'local' | 'jwt' | 'jwt-refresh' | 'jwt-reset-password' | 'jwt-verify-email';
    userType?: UserType[];
    userRole?: UserRole;
}): MethodDecorator;
//# sourceMappingURL=auth.decorator.d.ts.map