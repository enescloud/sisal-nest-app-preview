import { PageOptionsInput } from '@core/entities/pagination/page-options.input';
import { PrismaService } from '@core/services/prisma';
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const user = await this.prismaService.user.create({ data });
      return user;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('User with this email already exist');
      }
      throw e;
    }
  }

  async updateById(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prismaService.user.update({ data, where }).catch((e) => {
      this.logger.error('Update failed', e);
      throw new ConflictException('Update failed');
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.prismaService.user
      .delete({
        where: { id },
      })
      .catch((e) => {
        this.logger.error('Delete failed', e);
        throw new ConflictException('Update failed');
      });
  }

  async findById(id: number): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({ where: { email } });
  }

  async findMany(
    where: Prisma.UserWhereInput,
    pageOptionsInput: PageOptionsInput,
  ): Promise<User[]> {
    const { skip, take, orderBy, orderDirection } = pageOptionsInput;
    return this.prismaService.user
      .findMany({
        where,
        skip,
        take,
        orderBy: {
          [orderBy]: orderDirection,
        },
      })
      .catch((e) => {
        this.logger.error('findMany failed', e);
        throw new ConflictException('Error while fetching users');
      });
  }

  async count(where: Prisma.UserWhereInput): Promise<number> {
    return this.prismaService.user.count({ where }).catch((e) => {
      this.logger.error('count failed', e);
      throw new ConflictException('Error while counting users');
    });
  }
}
