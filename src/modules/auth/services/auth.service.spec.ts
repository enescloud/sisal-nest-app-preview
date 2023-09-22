import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignInInputDto } from '../dto/sign-in.input.dto';
import { AppModule } from '@app/module';
import { setupVersioning } from '@app/setup';
import { INestApplication } from '@nestjs/common';
import { UserRole, UserType } from '@prisma/client';
import { SignUpResponseDto } from '../dto/sign-up.response.dto';
import { SignInResponseDto } from '../dto/sign-in.response.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { StringUtils } from '@core/utils/string.utils';
import { AuthConstants } from '../constants';
import ms from 'ms';

describe('AuthService', () => {
  let app: INestApplication;
  let service: AuthService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupVersioning(app);
    await app.init();

    service = app.get<AuthService>(AuthService);
    jwtService = app.get<JwtService>(JwtService);
    configService = app.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sign-up', () => {
    it('should create a new user', async () => {
      const signupDto: SignInInputDto = {
        email: 'test1-auth-signup@sisal.com',
        password: 'Password1*',
      };
      const response = await service.signUp(signupDto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(SignUpResponseDto);

      expect(response.email).toEqual(signupDto.email);
    });
  });

  describe('generate-tokens', () => {
    it('should create a user than generate tokens', async () => {
      const user = await service.signUp({
        email: 'test2-auth-validate-user@sisal.com',
        password: 'Password1*',
      });

      const response = await service.generateTokens({
        id: user.id,
        email: user.email,
        type: user.type,
        role: user.role,
      });

      expect(response).toBeDefined();
      expect(response.accessToken).toBeDefined();
      expect(response.refreshToken).toBeDefined();
      expect(response.hashedRefreshToken).toBeDefined();

      expect(await jwtService.verify(response.accessToken)).toMatchObject(
        expect.objectContaining({
          id: user.id,
          email: user.email,
          type: user.type,
          role: user.role,
        }),
      );
    });
  });

  describe('validate-user', () => {
    it('should create a user than validate it', async () => {
      const user = await service.signUp({
        email: 'test3-auth-validate-user@sisal.com',
        password: 'Password1*',
      });

      const response = await service.validateUser(user.email, 'Password1*');

      expect(response).toBeDefined();
      expect(response).toMatchObject(
        expect.objectContaining({
          id: user.id,
          email: user.email,
          type: user.type,
          role: user.role,
        }),
      );
    });
  });

  describe('sign-in', () => {
    it('should create a user than should sign in and return rokens', async () => {
      const user = await service.signUp({
        email: 'test4-auth-signin@sisal.com',
        password: 'Password1*',
      });

      const response = await service.signIn({
        id: user.id,
        email: user.email,
        type: user.type,
        role: user.role,
      });

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(SignInResponseDto);
    });
  });
});
