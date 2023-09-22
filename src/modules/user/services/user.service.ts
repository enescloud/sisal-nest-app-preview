import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { PageMeta } from "@core/entities/pagination/page-meta.dto";
import { PageOptionsInput } from "@core/entities/pagination/page-options.input";
import { PaginationResponse } from "@core/entities/pagination/pagination.response";
import { StringUtils } from "@core/utils/string.utils";
import { CreateUserInputDto } from "../dto/create-user.input.dto";
import { UserRepository } from "../repositories/user.repository";
import { UserResponseDto } from "../dto/user.response.dto";
import { GetUsersFilter } from "../dto/get-users-filter.dto";

@Injectable()
/* The `UserService` class provides methods for creating, finding, updating, and deleting user records
using a `UserRepository`. */
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserInputDto): Promise<UserResponseDto> {
    return new UserResponseDto(
      await this.userRepository.create({
        ...createUserDto,
        password: await StringUtils.hashString(createUserDto.password),
        isDeleted: false,
      })
    );
  }

  async findById(id: number): Promise<UserResponseDto> {
    return new UserResponseDto(await this.userRepository.findById(id));
  }

  async findByEmailToValidate(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }

  async findMany(
    filter: GetUsersFilter,
    pageOptionsInput: PageOptionsInput
  ): Promise<PaginationResponse<UserResponseDto>> {
    const where: Prisma.UserWhereInput = {
      type: filter.type,
      role: filter.role,
      createdAt: {
        gte: filter.createdAtRange?.from,
        lte: filter.createdAtRange?.to,
      },
    };

    const [items, itemCount] = await Promise.all([
      this.userRepository.findMany(where, pageOptionsInput),
      this.userRepository.count(where),
    ]);

    const pageMeta = new PageMeta({
      itemCount,
      pageOptionsInput,
    });

    return new PaginationResponse(
      items.map((item) => {
        return new UserResponseDto(item);
      }),
      pageMeta
    );
  }

  async updateById(
    id: number,
    data: Prisma.UserUpdateInput
  ): Promise<UserResponseDto> {
    // Check if the user exists
    await this.userRepository.findById(id);

    return new UserResponseDto(
      await this.userRepository.updateById({ id }, data)
    );
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.deleteById(id);
  }
}
