import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCatDto } from './dto/create-cat.dto';
import { ListAllEntities } from './dto/list-all-entities.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { User } from '../common/decorators/user.decorator';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCatDto: CreateCatDto, @User() user) {
    return this.catsService.create({ ...createCatDto, ...user });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) catId: number) {
    return this.catsService.findOne({ catId });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query: ListAllEntities) {
    return this.catsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) catId: number,
    @Body() payload: UpdateCatDto,
    @User() user
  ) {
    return this.catsService.update({ catId, ...user }, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) catId: number, @User() user) {
    return this.catsService.remove({ catId, ...user });
  }
}
