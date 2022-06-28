import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {
    this.userModel = userModel;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;
    const user = await this.findOne({ email });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPwd = await bcrypt.hash(password, 8);

    return this.userModel.create({ ...createUserDto, password: hashedPwd });
  }

  findOne(query: ListAllEntities): Promise<User> {
    return this.userModel.findOne({
      where: { ...query },
    });
  }

  findAll(query: ListAllEntities): Promise<User[]> {
    return this.userModel.findAll({
      where: { ...query },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, {
      where: {
        userId: id,
      },
    });
  }
}
