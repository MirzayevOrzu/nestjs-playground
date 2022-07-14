import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCatDto } from './dto/create-cat.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { QueryCatDto } from './dto/query-cat.dto';
import { Cat } from './models/cat.model';
import { faker } from '@faker-js/faker';
import { Cache } from 'cache-manager';

@Injectable()
export class CatsService {
  constructor(
    @InjectModel(Cat) private readonly catModel: typeof Cat,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
    this.catModel = catModel;
  }

  create(createCatDto: CreateCatDto): Promise<Cat> {
    return this.catModel.create({ ...createCatDto });
  }

  findOne(query: QueryCatDto): Promise<Cat> {
    return this.catModel.findOne({
      where: {
        ...query,
      },
    });
  }

  findAll(query: ListAllEntities): Promise<Cat[]> {
    return this.catModel.findAll({
      where: {
        ...query,
      },
    });
  }

  update(query: QueryCatDto, payload: UpdateCatDto) {
    return this.catModel.update(payload, {
      where: {
        ...query,
      },
    });
  }

  async remove(query: QueryCatDto): Promise<void> {
    const cat = await this.findOne(query);

    console.log(cat);

    if (!cat) {
      throw new NotFoundException();
    }

    await cat.destroy();
  }

  async seed(query: QueryCatDto) {
    const cats: Cat[] = [];

    for (let i = 0; i < 10000; i++) {
      cats.push({
        userId: query.userId,
        name: faker.name.findName(),
        breed: faker.animal.cat(),
      } as Cat)
    }

    await this.catModel.bulkCreate(cats as unknown as any);

    return cats.length;
  }
}
