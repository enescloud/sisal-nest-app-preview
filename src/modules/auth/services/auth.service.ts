import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import ms from 'ms';

import { AppConfigService } from '@core/config';

import { Prisma, UserRole, UserType } from '@prisma/client';
import { StringUtils } from '@core/utils/string.utils';
import { UserService } from '../../user/services/user.service';
import { AuthConstants } from '../constants';
import { CurrentUser, TokenSecrets } from '../types/types';
import { SignUpInputDto } from '../dto/sign-up.input.dto';
import { SignUpResponseDto } from '../dto/sign-up.response.dto';
import { SignInResponseDto } from '../dto/sign-in.response.dto';

@Injectable()
/* The `AuthService` class handles user authentication and authorization, including sign up, sign in,
user validation, and token generation. */
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private configService: AppConfigService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  /**
   * The signUp function creates a new user with the provided input and returns a response containing the
   * created user's information.
   * @param {SignUpInputDto} signUpInputDto - The `signUpInputDto` parameter is an object that contains
   * the input data for signing up a user. It likely includes properties such as `email`, `password`,
   * `firstName`, `lastName`, etc.
   * @returns a Promise that resolves to a SignUpResponseDto object.
   */
  async signUp(signUpInputDto: SignUpInputDto): Promise<SignUpResponseDto> {
    try {
      const user = await this.userService.create({
        ...signUpInputDto,
        role: UserRole.user_member,
        type: UserType.user,
      });

      return new SignUpResponseDto(user);
    } catch (e) {
      this.logger.error(`Error in AuthService.signUp: `, e);
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException('User with this email already exists');
      }
      throw e;
    }
  }

  /**
   * The `signIn` function updates the user's refresh token and last login date, and returns a response
   * containing the access token, refresh token, and expiration date.
   * @param {CurrentUser} currentUser - The `currentUser` parameter is an object that represents the
   * currently signed-in user. It likely contains information such as the user's ID, username, email, and
   * any other relevant user data.
   * @returns a Promise that resolves to a SignInResponseDto object.
   */
  async signIn(currentUser: CurrentUser): Promise<SignInResponseDto> {
    const tokenSecrets = await this.generateTokens(currentUser);

    await this.userService
      .updateById(currentUser.id, {
        refreshToken: {
          upsert: {
            create: {
              token: tokenSecrets.hashedRefreshToken,
              expiresAt: new Date(
                Date.now() + AuthConstants.refreshTokenExpiresIn,
              ),
            },
            update: {
              token: tokenSecrets.hashedRefreshToken,
              expiresAt: new Date(
                Date.now() + AuthConstants.refreshTokenExpiresIn,
              ),
            },
          },
        },
        lastLoginDate: new Date(Date.now()),
      })
      .catch((e) => {
        this.logger.error(`Error in AuthService.signIn: `, e);
        throw new BadRequestException('Could not update user');
      });

    return new SignInResponseDto({
      accessToken: tokenSecrets.accessToken,
      refreshToken: tokenSecrets.refreshToken,
      expiresAt: new Date(Date.now() + AuthConstants.accessTokenExpiresIn),
    });
  }

  /**
   * The function `validateUser` takes an email and password as input, validates the user by checking if
   * the email and password match, and returns the user's information if valid.
   * @param {string} email - A string representing the email of the user to be validated.
   * @param {string} pass - The `pass` parameter is a string that represents the password entered by the
   * user for authentication.
   * @returns The function `validateUser` returns a `Promise` that resolves to an object of type
   * `CurrentUser`.
   */
  async validateUser(email: string, pass: string): Promise<CurrentUser> {
    const user = await this.userService.findByEmailToValidate(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password!');
    }

    if (!(await compare(pass, user.password))) {
      this.logger.warn(
        'Detected login attempt with invalid password user: ',
        user,
      );
      throw new UnauthorizedException('Invalid email or password!');
    }

    if (user.isDeleted) {
      this.logger.warn('Detected deleted user login attempt: ', user);

      throw new ForbiddenException('User is deleted.');
    }

    return {
      id: user.id,
      email: user.email,
      type: user.type,
      role: user.role,
    };
  }

  /**
   * The function `generateTokens` generates an access token and a refresh token for a given user, and
   * returns them along with the hashed refresh token.
   * @param {CurrentUser} user - The `user` parameter is an object representing the current user. It
   * likely contains information such as the user's ID, username, email, and any other relevant user
   * data. This information is used to generate the access token and refresh token for the user.
   * @returns The function `generateTokens` returns a Promise that resolves to an object of type
   * `TokenSecrets`. The `TokenSecrets` object contains the following properties:
   */
  async generateTokens(user: CurrentUser): Promise<TokenSecrets> {
    const accessToken = await this.jwtService
      .signAsync(user, {
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        expiresIn: ms(AuthConstants.accessTokenExpiresIn),
      })
      .catch((e) => {
        this.logger.error(`Error in AuthService.generateTokens: `, e);
        throw new Error(`Could not generate access token`);
      });

    const refreshToken = await this.jwtService
      .signAsync(user, {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: ms(AuthConstants.refreshTokenExpiresIn),
      })
      .catch((e) => {
        this.logger.error(`Error in AuthService.refreshTokens: `, e);
        throw new Error(`Could not generate refresh token`);
      });

    const hashedRefreshToken = await StringUtils.hashString(refreshToken);

    return {
      accessToken,
      refreshToken,
      hashedRefreshToken,
    };
  }
}
