import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let usersController: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => ({ userId: Date.now(), ...dto })),
    findOne: jest.fn((query) => ({
      firstName: 'Omar',
      lastName: 'Epps',
      email: 'epps@gmail.com',
      password: '12345',
      ...query,
    })),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    usersController = app.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('register', () => {
    it('should be defined', () => {
      expect(usersController.register).toBeDefined();
    });

    it('should register (create) a new user', () => {
      const payload = {
        firstName: 'Omar',
        lastName: 'Epps',
        email: 'epps@gmail,com',
        password: '12345',
      };
      expect(usersController.register(payload as CreateUserDto)).toEqual({
        userId: expect.any(Number),
        ...payload,
      });
      expect(mockUsersService.create).toHaveBeenCalled();
    });
  });

  describe('profile', () => {
    it('should be defined', () => {
      expect(usersController.profile).toBeDefined();
    });

    it('should return user profile data', () => {
      const req = { user: { userId: 1 } };
      expect(usersController.profile(req)).toEqual({
        firstName: 'Omar',
        lastName: 'Epps',
        email: 'epps@gmail.com',
        password: '12345',
        userId: 1,
      });

      expect(mockUsersService.findOne).toHaveBeenCalled();
      expect(mockUsersService.findOne).toHaveBeenCalledWith(req.user);
    });
  });
});
