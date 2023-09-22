import { Prisma } from '@prisma/client';
import { UserEntity } from '../entities/user.entity';
export declare const userArgs: {
    select: {
        id: true;
        email: true;
        type: true;
        role: true;
        isDeleted: true;
        createdAt: true;
    };
};
export type UserType = Prisma.UserGetPayload<typeof userArgs>;
declare const UserResponseDto_base: import("@nestjs/common").Type<Pick<UserEntity, keyof UserEntity>>;
export declare class UserResponseDto extends UserResponseDto_base {
    constructor(user: UserType);
}
export {};
//# sourceMappingURL=user.response.dto.d.ts.map