import { Prisma, User } from '@prisma/client';
import { PageOptionsInput } from '@core/entities/pagination/page-options.input';
import { PaginationResponse } from '@core/entities/pagination/pagination.response';
import { CreateUserInputDto } from '../dto/create-user.input.dto';
import { UserRepository } from '../repositories/user.repository';
import { UserResponseDto } from '../dto/user.response.dto';
import { GetUsersFilter } from '../dto/get-users-filter.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    create(createUserDto: CreateUserInputDto): Promise<UserResponseDto>;
    findById(id: number): Promise<UserResponseDto>;
    findByEmailToValidate(email: string): Promise<User>;
    findMany(filter: GetUsersFilter, pageOptionsInput: PageOptionsInput): Promise<PaginationResponse<UserResponseDto>>;
    updateById(id: number, data: Prisma.UserUpdateInput): Promise<UserResponseDto>;
    deleteById(id: number): Promise<void>;
}
//# sourceMappingURL=user.service.d.ts.map