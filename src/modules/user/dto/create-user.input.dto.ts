import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsLowercase,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserInputDto {
  @ApiProperty()
  @IsLowercase()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsStrongPassword({
    minSymbols: 1,
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  password!: string;

  @ApiProperty({
    enum: UserType,
    enumName: 'UserType',
  })
  @IsEnum(UserType)
  type!: UserType;

  @ApiProperty({
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsEnum(UserRole)
  role!: UserRole;
}
