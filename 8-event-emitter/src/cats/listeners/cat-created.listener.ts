import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CatCreatedEvent } from '../events/cat-created.event';

@Injectable()
export class CatCreatedListener {
  @OnEvent('cat.created')
  handleCatCreatedEvent(event: CatCreatedEvent) {
    console.log(event);
  }
}
