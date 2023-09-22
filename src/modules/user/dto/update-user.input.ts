import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserType } from '@prisma/client';
import { IsEmail, IsEnum, IsLowercase, IsOptional } from 'class-validator';

export class UpdateUserInputDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsLowercase()
  @IsEmail()
  email!: string;

  @ApiPropertyOptional({
    enum: UserType,
    enumName: 'UserType',
  })
  @IsOptional()
  @IsEnum(UserType)
  type!: UserType;

  @ApiPropertyOptional({
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role!: UserRole;
}
