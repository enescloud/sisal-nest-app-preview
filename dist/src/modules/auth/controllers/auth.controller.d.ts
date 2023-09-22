import { AuthService } from '../services/auth.service';
import { SignUpInputDto } from '../dto/sign-up.input.dto';
import { SignUpResponseDto } from '../dto/sign-up.response.dto';
import { CurrentUser } from '../types/types';
import { SignInInputDto } from '../dto/sign-in.input.dto';
import { SignInResponseDto } from '../dto/sign-in.response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpInputDto: SignUpInputDto): Promise<SignUpResponseDto>;
    signIn(signInInput: SignInInputDto, currentUser: CurrentUser): Promise<SignInResponseDto>;
}
//# sourceMappingURL=auth.controller.d.ts.map