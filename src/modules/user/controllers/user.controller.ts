import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { UserType } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@core/decorators/paginated-response.decorator';
import { PageOptionsInput } from '@core/entities/pagination/page-options.input';
import { PaginationResponse } from '@core/entities/pagination/pagination.response';
import { FilterApiQuery } from '@core/decorators/filter-api-query.decorator';
import { Auth } from '../../auth/decorators/auth.decorator';
import { UserResponseDto } from '../dto/user.response.dto';
import { UpdateUserInputDto } from '../dto/update-user.input';
import { CreateUserInputDto } from '../dto/create-user.input.dto';
import { UserService } from '../services/user.service';
import { GetUsersFilter } from '../dto/get-users-filter.dto';

@ApiTags('users')
@Controller({
  version: '1',
  path: 'users',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth({
    userType: [UserType.admin],
  })
  @FilterApiQuery({
    name: 'filter',
    model: GetUsersFilter,
  })
  @ApiPaginatedResponse(UserResponseDto)
  getUsers(
    @Query('filter') filter: GetUsersFilter,
    @Query('pageOptions') pageOptionsInput: PageOptionsInput,
  ): Promise<PaginationResponse<UserResponseDto>> {
    return this.userService.findMany(filter, pageOptionsInput);
  }

  @Get('/:id')
  @Auth({
    userType: [UserType.admin, UserType.user],
  })
  getUser(@Param('id') id: number): Promise<UserResponseDto> {
    return this.userService.findById(id);
  }

  @Post()
  @Auth({
    userType: [UserType.admin],
  })
  create(@Body() createUserDto: CreateUserInputDto): Promise<UserResponseDto> {
    return this.userService.create(createUserDto);
  }

  @Patch(':id')
  @Auth({
    userType: [UserType.admin, UserType.user],
  })
  updateById(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserInputDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateById(id, updateUserDto);
  }

  @Delete('/:id')
  @Auth({
    userType: [UserType.admin],
  })
  delete(@Param('id') id: number): Promise<void> {
    return this.userService.deleteById(id);
  }
}
