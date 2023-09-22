import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole, UserType } from '@prisma/client';

export class UserEntity {
  @ApiProperty({ type: Number })
  id!: number;

  @ApiProperty({ type: Date })
  createdAt!: Date;

  @ApiProperty({ type: Date })
  updatedAt!: Date;

  @ApiProperty({ type: String })
  email!: string;

  @ApiProperty({ type: String })
  password!: string;

  @ApiProperty({ enum: UserType, enumName: 'UserType' })
  type!: UserType;

  @ApiProperty({ type: Boolean })
  isDeleted!: boolean;

  @ApiProperty({ isArray: true, enum: UserRole, enumName: 'UserRole' })
  role!: UserRole;

  @ApiPropertyOptional({ nullable: true, type: Date })
  deletedAt!: Date | null;
}
