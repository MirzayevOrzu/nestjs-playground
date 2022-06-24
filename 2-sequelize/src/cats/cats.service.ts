import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCatDto } from './dto/create-cat.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './models/cat.model';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat) private readonly catModel: typeof Cat) {
    this.catModel = catModel;
  }

  create(createCatDto: CreateCatDto): Promise<Cat> {
    return this.catModel.create({ ...createCatDto });
  }

  findOne(id: number): Promise<Cat> {
    return this.catModel.findOne({
      where: {
        catId: id,
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

  update(id: number, payload: UpdateCatDto) {
    return this.catModel.update(payload, {
      where: {
        catId: id,
      },
    });
  }

  async remove(id: number): Promise<void> {
    const cat = await this.findOne(id);
    await cat.destroy();
  }
}
