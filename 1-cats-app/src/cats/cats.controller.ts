import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CatsService, Cat } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() cat: Cat) {
    return this.catsService.create(cat);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.catsService.findOne(id);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: Cat) {
    return this.catsService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.catsService.remove(id);
  }
}
