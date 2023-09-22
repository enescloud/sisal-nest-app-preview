import { PageOptionsInput } from '@core/entities/pagination/page-options.input';
import { PrismaService } from '@core/services/prisma';
import { Prisma, User } from '@prisma/client';
export declare class UserRepository {
    private readonly prismaService;
    private readonly logger;
    constructor(prismaService: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<User>;
    updateById(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<User>;
    deleteById(id: number): Promise<void>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findMany(where: Prisma.UserWhereInput, pageOptionsInput: PageOptionsInput): Promise<User[]>;
    count(where: Prisma.UserWhereInput): Promise<number>;
}
//# sourceMappingURL=user.repository.d.ts.map