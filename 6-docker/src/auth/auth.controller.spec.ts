import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

describe('AuthController', () => {
  let authController: AuthController;

  const user = {
    userId: 1,
    firstName: 'Abdurrohman',
    lastName: 'Umarov',
    email: 'umarov@gmail.com',
    password: '12345',
  };

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn((user) => ({
      accessToken: 'token',
    })),
  };

  const mockUsersService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should be defined', () => {
      expect(authController.login).toBeDefined();
    });

    it('should login user', () => {
      const req = { user };
      expect(authController.login(req)).toEqual({
        accessToken: 'token',
      });
      expect(mockAuthService.login).toHaveBeenCalledTimes(1);
      expect(mockAuthService.login).toHaveBeenLastCalledWith(req.user);
    });
  });
});
