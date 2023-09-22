import { UserRole, UserType } from '@prisma/client';
import { DateRangeFilter } from '@core/dto/filters/global/date-range-filter.dto';
export declare class GetUsersFilter {
    type?: UserType;
    role?: UserRole;
    createdAtRange?: DateRangeFilter;
}
//# sourceMappingURL=get-users-filter.dto.d.ts.map