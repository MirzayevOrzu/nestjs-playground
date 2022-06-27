import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { Todo } from 'src/common/types/todo';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async create(createTodoDto: CreateTodoDto) {
    const todos = await this.knex.table('todos').insert({
      title: createTodoDto.title,
      user_id: createTodoDto.user_id,
    });
    return todos;
  }

  async findAll(query: Todo) {
    const todos = await this.knex.table('todos').where(query);
    return todos;
  }

  async findOne(query: Todo) {
    const todos = await this.knex.table('todos').where(query);
    return todos;
  }

  async update(query: Todo, updateTodoDto: UpdateTodoDto) {
    const todos = await this.knex.table('todos').where(query).update({
      title: updateTodoDto.title,
    });
    return todos;
  }

  async remove(query: Todo) {
    const todos = await this.knex.table('todos').where(query).del();
    return todos;
  }
}
