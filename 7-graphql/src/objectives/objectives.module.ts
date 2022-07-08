import { Module } from '@nestjs/common';
import { ObjectivesService } from './objectives.service';
import { ObjectivesResolver } from './objectives.resolver';

@Module({
  providers: [ObjectivesResolver, ObjectivesService],
})
export class ObjectivesModule {}
