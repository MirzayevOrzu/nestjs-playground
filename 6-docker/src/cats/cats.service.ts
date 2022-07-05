import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCatDto } from './dto/create-cat.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { QueryCatDto } from './dto/query-cat.dto';
import { Cat } from './models/cat.model';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat) private readonly catModel: typeof Cat) {
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

    if (!cat) {
      throw new NotFoundException();
    }

    await cat.destroy();
  }
}
