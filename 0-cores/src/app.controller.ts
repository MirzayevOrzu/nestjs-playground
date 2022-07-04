import {
  BadRequestException,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('example/:id/:count')
  getExample(
    @Param('id', ParseIntPipe) id: number,
    @Param('count') count: string
  ) {
    Logger.log(`typeof id is ${typeof id}`); // number (transformed with ParseIntPipe)
    Logger.log(`typeof count is ${typeof count}`); // string
    return 'Ok';
  }
}
