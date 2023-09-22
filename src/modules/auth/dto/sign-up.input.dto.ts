import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLowercase, IsStrongPassword } from 'class-validator';

export class SignUpInputDto {
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
}
