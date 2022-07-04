import { Controller, Get, Logger, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res({ passthrough: true }) res: Response): string {
    Logger.log(`Message from middleware: ${res.locals.message}`);
    return this.appService.getHello();
  }
}
