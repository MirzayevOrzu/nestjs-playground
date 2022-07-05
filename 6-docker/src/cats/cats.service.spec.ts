import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Cat } from './models/cat.model';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

describe('CatsService', () => {
  let catsService: CatsService;

  const catsArray = [
    { catId: 1, name: 'Mri', breed: 'Cornish Rex', userId: 1 },
    { catId: 2, name: 'Mosh', breed: 'American bobtail', userId: 2 },
  ];

  const oneCat = {
    name: 'Mallavoy',
    breed: 'Persian',
  };

  const mockCatModel = {
    create: jest.fn((dto) => ({ catId: Date.now(), ...dto })),
    findOne: jest
      .fn()
      .mockImplementationOnce(async (query) => ({
        catId: query.where.catId,
        ...oneCat,
      }))
      .mockImplementationOnce(async (query) => ({
        catId: query.where.catId,
        ...oneCat,
        destroy: jest.fn(),
      }))
      .mockImplementation(jest.fn()),
    findAll: jest.fn((query) => catsArray),
    update: jest.fn((update, query) => ({
      catId: query.where.catId,
      ...update,
    })),
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(Cat),
          useValue: mockCatModel,
        },
      ],
    }).compile();

    catsService = app.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(catsService).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(catsService.create).toBeDefined();
    });

    it('should create one cat', () => {
      const user = {};
      expect(catsService.create({ ...oneCat } as CreateCatDto)).toEqual({
        catId: expect.any(Number),
        ...oneCat,
      });
      expect(mockCatModel.create).toHaveBeenLastCalledWith(oneCat);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(catsService.findOne).toBeDefined();
    });

    it('should return one user', async () => {
      const cat = await catsService.findOne({ catId: 3 });
      expect(cat).toEqual({
        catId: 3,
        ...oneCat,
      });
      expect(mockCatModel.findOne).toHaveBeenLastCalledWith({
        where: { catId: 3 },
      });
    });
  });

  describe('findAll', () => {
    it('should be defined', () => {
      expect(catsService.findAll).toBeDefined();
    });

    it('should return array of cats', () => {
      expect(catsService.findAll({})).toEqual(catsArray);
      expect(mockCatModel.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should be defined', () => {
      expect(catsService.update).toBeDefined();
    });

    it('should udpate one cat', () => {
      expect(catsService.update({ catId: 3 }, oneCat)).toEqual({
        catId: 3,
        ...oneCat,
      });
      expect(mockCatModel.update).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should be defined', () => {
      expect(catsService.remove).toBeDefined();
    });

    it('should remove one cat', async () => {
      const res = await catsService.remove({ catId: 3 });
      expect(res).toBe(undefined);
    });

    it('should throw error when removing non existing cat', () => {
      expect.assertions(1);
      return catsService.remove({ catId: 4 }).catch((err) => {
        expect(err instanceof Error).toBe(true);
      });
    });
  });
});
