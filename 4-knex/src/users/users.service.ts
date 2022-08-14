import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { User } from 'src/common/types/user';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createUserDto: CreateUserDto): Promise<number[]> {
    const { password } = createUserDto;
    console.log('validating pipe');
    const hashedPassword = await bcrypt.hash(password, 6);

    const users = await this.knex.table('users').insert({
      ...createUserDto,
      password: hashedPassword,
    });

    return users;
  }

  async findOne(query: FindUserDto): Promise<User> {
    const user = await this.knex.table('users').where({ ...query }).first();

    if (!user.length) {
      throw new NotFoundException('User with data sent not found');
    }

    return user;
  }
}
