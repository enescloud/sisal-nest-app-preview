import { ApiProperty } from '@nestjs/swagger';

export class SignInResponseDto {
  constructor(partial: Partial<SignInResponseDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  accessToken!: string;

  @ApiProperty()
  refreshToken!: string;

  @ApiProperty()
  expiresAt!: Date;
}
