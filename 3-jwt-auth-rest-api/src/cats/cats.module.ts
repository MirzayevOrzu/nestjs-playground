import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Cat } from './models/cat.model';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  imports: [SequelizeModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
