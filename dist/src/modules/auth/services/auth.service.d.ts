import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '@core/config';
import { UserService } from '../../user/services/user.service';
import { CurrentUser, TokenSecrets } from '../types/types';
import { SignUpInputDto } from '../dto/sign-up.input.dto';
import { SignUpResponseDto } from '../dto/sign-up.response.dto';
import { SignInResponseDto } from '../dto/sign-in.response.dto';
export declare class AuthService {
    private configService;
    private jwtService;
    private userService;
    private readonly logger;
    constructor(configService: AppConfigService, jwtService: JwtService, userService: UserService);
    signUp(signUpInputDto: SignUpInputDto): Promise<SignUpResponseDto>;
    signIn(currentUser: CurrentUser): Promise<SignInResponseDto>;
    validateUser(email: string, pass: string): Promise<CurrentUser>;
    generateTokens(user: CurrentUser): Promise<TokenSecrets>;
}
//# sourceMappingURL=auth.service.d.ts.map