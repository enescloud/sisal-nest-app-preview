import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { AppModule } from '@app/module';
import { setupVersioning } from '@app/setup';
import { INestApplication } from '@nestjs/common';
import { UserType, UserRole, User, Prisma } from '@prisma/client';
import { CreateUserInputDto } from '../dto/create-user.input.dto';
import { UserResponseDto } from '../dto/user.response.dto';
import { PageOptionsInput } from '@core/entities/pagination/page-options.input';
import { GetUsersFilter } from '../dto/get-users-filter.dto';
import { isArray } from 'lodash';
import { PageMeta } from '@core/entities/pagination/page-meta.dto';
import { PrismaService } from '@core/services/prisma';

describe('UserService', () => {
  let app: INestApplication;
  let service: UserService;
  let prismaService: PrismaService;
  let deleteSpy: jest.SpyInstance;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupVersioning(app);
    await app.init();

    service = app.get<UserService>(UserService);
    prismaService = app.get<PrismaService>(PrismaService);
    deleteSpy = jest.spyOn(prismaService.user, 'delete');
  });

  afterEach(() => {
    // Clear spyOn after every test
    deleteSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create-user', () => {
    it('should create a new user', async () => {
      const createUserInputDto: CreateUserInputDto = {
        email: 'test1-user-create@sisal.com',
        password: 'Password1*',
        type: UserType.admin,
        role: UserRole.admin_superAdmin,
      };

      const response = await service.create(createUserInputDto);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(UserResponseDto);

      expect(response).toMatchObject(
        expect.objectContaining({
          email: createUserInputDto.email,
          type: createUserInputDto.type,
          role: createUserInputDto.role,
          isDeleted: false,
        }),
      );
    });
  });

  describe('find-by-id', () => {
    it('should create admin user and should get user by that user id', async () => {
      const createUserInputDto: CreateUserInputDto = {
        email: 'test2-user-find-by-id@sisal.com',
        password: 'Password1*',
        type: UserType.admin,
        role: UserRole.admin_superAdmin,
      };

      const user = await service.create(createUserInputDto);

      const response = await service.findById(user.id);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(UserResponseDto);

      expect(response).toMatchObject(
        expect.objectContaining({
          id: user.id,
          email: user.email,
          type: user.type,
          role: user.role,
          isDeleted: user.isDeleted,
          createdAt: user.createdAt,
        }),
      );
    });
  });

  describe('find-by-email', () => {
    it('should create admin user and should get user by that user email', async () => {
      const createUserInputDto: CreateUserInputDto = {
        email: 'test3-user-find-by-email@sisal.com',
        password: 'Password1*',
        type: UserType.admin,
        role: UserRole.admin_superAdmin,
      };

      const user = await service.create(createUserInputDto);

      const response = await service.findByEmailToValidate(user.email);

      expect(response).toBeDefined();
      expect(typeof response).toBe('object');
      expect(response).toMatchObject(
        expect.objectContaining({
          id: user.id,
          email: user.email,
          type: user.type,
          role: user.role,
          isDeleted: user.isDeleted,
          createdAt: user.createdAt,
        }),
      );
    });
  });

  describe('find-all', () => {
    it('should create admin user and should get all users', async () => {
      // Set from date to one day before
      const today = new Date();
      const from = new Date(today);
      from.setDate(today.getDate() - 1);

      const filter: GetUsersFilter = {
        type: UserType.admin,
        role: UserRole.admin_superAdmin,
        createdAtRange: {
          from,
          to: new Date(),
        },
      };

      const pageOptionsInput: PageOptionsInput = {
        orderDirection: 'desc',
        orderBy: 'createdAt',
        page: 1,
        take: 10,
        skip: 0,
      };

      const response = await service.findMany(filter, pageOptionsInput);

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(response.meta).toBeDefined();

      expect(isArray(response.data)).toBe(true);
      expect(response.data.length).toBeGreaterThan(0);
      response.data.forEach((item) => {
        expect(item).toBeInstanceOf(UserResponseDto);
      });
      expect(response.meta).toBeInstanceOf(PageMeta);
    });
  });

  describe('update-by-id', () => {
    it('should create admin user and should update user by that user id', async () => {
      const createUserInputDto: CreateUserInputDto = {
        email: 'test4-user-update@sisal.com',
        password: 'Password1*',
        type: UserType.admin,
        role: UserRole.admin_superAdmin,
      };

      const user = await service.create(createUserInputDto);

      const response = await service.updateById(user.id, {
        type: UserType.user,
        role: UserRole.user_member,
      });

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(UserResponseDto);

      expect(response).toMatchObject(
        expect.objectContaining({
          id: user.id,
          email: user.email,
          type: UserType.user,
          role: UserRole.user_member,
          createdAt: user.createdAt,
          isDeleted: user.isDeleted,
        }),
      );
    });
  });

  describe('delete-by-id', () => {
    it('should create admin user and should delete that user', async () => {
      const createUserInputDto: CreateUserInputDto = {
        email: 'test5-user-delete@sisal.com',
        password: 'Password1*',
        type: UserType.admin,
        role: UserRole.admin_superAdmin,
      };

      const user = await service.create(createUserInputDto);

      jest.spyOn(prismaService.user, 'delete');

      await service.deleteById(user.id);

      expect(deleteSpy).toHaveBeenCalledWith({
        where: { id: user.id },
      });
    });
  });
});
