import { Body, Controller, Post } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';

@Controller('dogs')
export class DogsController {
  /**
   * Create dog
   */
  @Post()
  create(@Body() payload: CreateDogDto) {
    return payload;
  }
}
