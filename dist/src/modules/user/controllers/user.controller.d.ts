import { PageOptionsInput } from '@core/entities/pagination/page-options.input';
import { PaginationResponse } from '@core/entities/pagination/pagination.response';
import { UserResponseDto } from '../dto/user.response.dto';
import { UpdateUserInputDto } from '../dto/update-user.input';
import { CreateUserInputDto } from '../dto/create-user.input.dto';
import { UserService } from '../services/user.service';
import { GetUsersFilter } from '../dto/get-users-filter.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(filter: GetUsersFilter, pageOptionsInput: PageOptionsInput): Promise<PaginationResponse<UserResponseDto>>;
    getUser(id: number): Promise<UserResponseDto>;
    create(createUserDto: CreateUserInputDto): Promise<UserResponseDto>;
    updateById(id: number, updateUserDto: UpdateUserInputDto): Promise<UserResponseDto>;
    delete(id: number): Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map