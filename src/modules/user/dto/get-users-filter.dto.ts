import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, ValidateNested } from 'class-validator';

import { DateRangeFilter } from '@core/dto/filters/global/date-range-filter.dto';

export class GetUsersFilter {
  @ApiPropertyOptional({ enum: UserType, enumName: 'UserType' })
  @IsOptional()
  @IsEnum(UserType)
  type?: UserType;

  @ApiPropertyOptional({ enum: UserRole, enumName: 'UserRole' })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    type: DateRangeFilter,
  })
  @Type(() => DateRangeFilter)
  @IsOptional()
  @ValidateNested()
  createdAtRange?: DateRangeFilter;
}
