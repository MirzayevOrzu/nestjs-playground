import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

describe('CatsController', () => {
  let catsController: CatsController;

  const catsArray = [
    { catId: 1, name: 'Mri', breed: 'Cornish Rex', userId: 1 },
    { catId: 2, name: 'Mosh', breed: 'American bobtail', userId: 2 },
  ];

  const oneCat = {
    catId: 3,
    name: 'Mallavoy',
    breed: 'Persian',
    userId: 1,
  };

  const mockCatsService = {
    create: jest.fn((dto) => ({ catId: Date.now(), ...dto })),
    findOne: jest.fn((catId) => oneCat),
    findAll: jest.fn(() => catsArray),
    update: jest.fn((query, update) => oneCat),
    remove: jest.fn((query) => {}),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: mockCatsService,
        },
      ],
    }).compile();

    catsController = app.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(catsController).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(catsController.create).toBeDefined();
    });

    it('should create a new cat', () => {
      const user = { userId: 1 };
      expect(catsController.create(oneCat as CreateCatDto, user)).toEqual({
        catId: expect.any(Number),
        ...oneCat,
        ...user,
      });
      expect(mockCatsService.create).toHaveBeenCalledTimes(1);
      expect(mockCatsService.create).toHaveBeenLastCalledWith({
        ...oneCat,
        ...user,
      });
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(catsController.findOne).toBeDefined();
    });

    it('should return one cat', () => {
      expect(catsController.findOne(3)).toEqual(oneCat);
      expect(mockCatsService.findOne).toHaveBeenLastCalledWith({ catId: 3 });
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(catsController.findAll).toBeDefined();
    });

    it('should return array of cats', () => {
      expect(catsController.findAll({})).toEqual(catsArray);
      expect(mockCatsService.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(catsController.update).toBeDefined();
    });

    it('should update one cat', () => {
      const user = { userId: 1 };
      expect(catsController.update(3, oneCat, user)).toEqual(oneCat);
      expect(mockCatsService.update).toHaveBeenLastCalledWith(
        { catId: 3, ...user },
        oneCat
      );
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(catsController.remove).toBeDefined();
    });

    it('should remove one cat', () => {
      const user = { userId: 1 };
      expect(catsController.remove(3, user)).toBe(undefined);
      expect(mockCatsService.remove).toHaveBeenLastCalledWith({
        catId: 3,
        ...user,
      });
    });
  });
});
