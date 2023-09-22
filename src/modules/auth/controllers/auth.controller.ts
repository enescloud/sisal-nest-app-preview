import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { SignUpInputDto } from '../dto/sign-up.input.dto';
import { SignUpResponseDto } from '../dto/sign-up.response.dto';
import { Auth } from '../decorators/auth.decorator';
import { RequestUser } from '../decorators/request-user.decorator';
import { CurrentUser } from '../types/types';
import { SignInInputDto } from '../dto/sign-in.input.dto';
import { SignInResponseDto } from '../dto/sign-in.response.dto';

@ApiTags('auth')
@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  signUp(@Body() signUpInputDto: SignUpInputDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpInputDto);
  }

  @Auth({
    strategy: 'local',
  })
  @Post('sign-in')
  async signIn(
    // Using this to show passport input fields on swagger
    @Body() signInInput: SignInInputDto,
    @RequestUser() currentUser: CurrentUser,
  ): Promise<SignInResponseDto> {
    return this.authService.signIn(currentUser);
  }
}
