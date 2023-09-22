import { Prisma } from '@prisma/client';
import { UserEntity } from '../../user/entities/user.entity';
export declare const userArgs: {
    select: {
        id: true;
        email: true;
        type: true;
        role: true;
        createdAt: true;
    };
};
export type UserType = Prisma.UserGetPayload<typeof userArgs>;
declare const SignUpResponseDto_base: import("@nestjs/common").Type<Pick<UserEntity, keyof UserEntity>>;
export declare class SignUpResponseDto extends SignUpResponseDto_base {
    constructor(user: UserType);
}
export {};
//# sourceMappingURL=sign-up.response.dto.d.ts.map