import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../common/decorators/CurrentUser';
import { User } from '../common/types/user';
import { Todo } from '../common/types/todo';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @CurrentUser() currentUser: User): Promise<any> {
    return this.todosService.create({ ...createTodoDto, user_id: currentUser.user_id });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() currentUser: User) {
    return this.todosService.findAll({ user_id: currentUser.user_id } as Todo);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: User) {
    return this.todosService.findOne({ todo_id: id, user_id: currentUser.user_id } as Todo);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
    @CurrentUser() currentUser: User
  ) {
    return this.todosService.update(
      { todo_id: id, user_id: currentUser.user_id } as Todo,
      updateTodoDto
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() currentUser: User) {
    return this.todosService.remove({ todo_id: id, user_id: currentUser.user_id } as Todo);
  }
}
