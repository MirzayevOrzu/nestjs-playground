import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { User } from './models/user.model';

describe('UsersService', () => {
  let usersService: UsersService;

  const usersArray = [
    {
      userId: 1,
      firstName: 'A',
      lastName: 'B',
      email: 'a@g.com',
      password: '12345',
    },
    {
      userId: 2,
      firstName: 'C',
      lastName: 'D',
      email: 'c@g.com',
      password: '12345',
    },
  ];

  const oneUser = {
    userId: 3,
    firstName: 'E',
    lastName: 'F',
    email: 'e@g.com',
    password: '12345',
  };

  const mockUserModel = {
    findAll: jest.fn(() => usersArray),
    findOne: jest.fn().mockReturnValueOnce(null).mockReturnValue(oneUser),
    create: jest.fn((oneUser) => oneUser),
    update: jest.fn((update, query) => oneUser),
    remove: jest.fn(),
    destroy: jest.fn(() => oneUser),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    usersService = app.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(usersService.create).toBeDefined();
    });

    it('should create a new user', async () => {
      const createdUser = await usersService.create(oneUser);
      const { password: hashedPwd, ...rest } = createdUser;
      const { password: originalPwd, ...oneUserRest } = oneUser;
      expect(rest).toEqual(oneUserRest);
      expect(hashedPwd.length).toBe(60);
      expect(hashedPwd).not.toBe(originalPwd);

      expect(mockUserModel.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserModel.create).toHaveBeenCalled();
    });

    it('should fail if user exists', () => {
      expect.assertions(3);
      return usersService.create(usersArray[0]).catch((err) => {
        expect(err.message).toMatch('User already exists');
        expect(mockUserModel.findOne).toHaveBeenCalledTimes(2);
        expect(mockUserModel.create).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(usersService.findOne).toBeDefined();
    });

    it('should return one user', () => {
      const query = { userId: 3 };
      expect(usersService.findOne(query)).toEqual(oneUser);
      expect(mockUserModel.findOne).toHaveBeenCalledTimes(3);
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(usersService.findAll).toBeDefined();
    });

    it('should return array of users', () => {
      expect(usersService.findAll({})).toEqual(usersArray);
      expect(mockUserModel.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(usersService.update).toBeDefined();
    });

    it('should update user', () => {
      expect(usersService.update(3, oneUser)).toEqual(oneUser);
      expect(mockUserModel.update).toHaveBeenCalledTimes(1);
    });
  });
});
