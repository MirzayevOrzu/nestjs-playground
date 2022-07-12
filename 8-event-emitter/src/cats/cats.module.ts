import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { CatCreatedListener } from './listeners/cat-created.listener';

@Module({
  controllers: [CatsController],
  providers: [CatsService, CatCreatedListener],
})
export class CatsModule {}
