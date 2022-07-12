import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [EventEmitterModule.forRoot(), CatsModule],
})
export class AppModule {}
