import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ForbiddenException } from './forbidden.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('example')
  getExample() {
    throw new ForbiddenException();
  }
}
