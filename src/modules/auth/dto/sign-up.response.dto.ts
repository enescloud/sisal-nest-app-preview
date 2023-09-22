import { PickType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { pick } from 'lodash';
import { UserEntity } from '../../user/entities/user.entity';

export const userArgs = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    type: true,
    role: true,
    createdAt: true,
  },
});

const properties: (keyof UserEntity)[] = [
  'id',
  'email',
  'type',
  'role',
  'createdAt',
];

export type UserType = Prisma.UserGetPayload<typeof userArgs>;

export class SignUpResponseDto extends PickType(UserEntity, properties) {
  constructor(user: UserType) {
    super();
    const partial = pick(user, properties);
    Object.assign(this, partial);
  }
}
