import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PageOptionsInput {
  @ApiPropertyOptional({
    enum: Prisma.SortOrder,
    default: Prisma.SortOrder.desc,
  })
  @IsEnum(Prisma.SortOrder)
  @IsOptional()
  readonly orderDirection: Prisma.SortOrder = Prisma.SortOrder.desc;

  @ApiPropertyOptional({
    default: 'id',
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly orderBy: string = 'id';

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take: number = 10;

  @ApiPropertyOptional()
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly search?: string;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
