import { UserRole, UserType } from '@prisma/client';
export declare class UserEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    password: string;
    type: UserType;
    isDeleted: boolean;
    role: UserRole;
    deletedAt: Date | null;
}
//# sourceMappingURL=user.entity.d.ts.map