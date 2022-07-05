import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let authService: AuthService;

  const user = {
    userId: 1,
    firstName: 'Aburrohman',
    lastName: 'Umarov',
    email: 'umarov@gmail.com',
    password: '12345',
  };
  let hashedPwd;

  let mockUsersService;

  const mockJwtService = {
    sign: jest.fn(() => 'token'),
  };

  beforeAll(async () => {
    hashedPwd = await bcrypt.hash(user.password, 8);
    mockUsersService = {
      findOne: jest.fn(async (query) => ({
        ...user,
        password: hashedPwd,
      })),
    };
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    authService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should be defined', () => {
      expect(authService.validateUser).toBeDefined();
    });

    it('should validate user and return it if valid', async () => {
      const { password, ...validatedUser } = user;
      const res = await authService.validateUser(user.email, user.password);
      expect(res).toEqual(validatedUser);
      expect(mockUsersService.findOne).toHaveBeenCalled();
    });

    it('should return nul if user is invalid', async () => {
      const res = await authService.validateUser(user.email, 'invalid');
      expect(res).toBe(null);
      expect(mockUsersService.findOne).toHaveBeenCalledTimes(2);
    });
  });

  describe('login', () => {
    it('should be defined', () => {
      expect(authService.login).toBeDefined();
    });

    it('should login user', async () => {
      const user = { dataValues: { userId: 1 } };
      const res = await authService.login(user);
      expect(res).toEqual({
        accessToken: expect.any(String),
      });
      expect(mockJwtService.sign).toHaveBeenCalled();
    });
  });
});
