import { Prisma } from '@prisma/client';
export declare class PageOptionsInput {
    readonly orderDirection: Prisma.SortOrder;
    readonly orderBy: string;
    readonly page: number;
    readonly take: number;
    readonly search?: string;
    get skip(): number;
}
//# sourceMappingURL=page-options.input.d.ts.map