import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatCreatedEvent } from './events/cat-created.event';

type Cat = {
  id: number;
  name: string;
  breed: string;
};

@Injectable()
export class CatsService {
  private cats: Cat[];

  constructor(private eventEmitter: EventEmitter2) {
    this.cats = [
      {
        id: 1,
        name: 'Mallavoy',
        breed: 'Persian',
      },
    ];
  }

  create(createCatDto: CreateCatDto) {
    const newCat = {
      id: this.cats.length + 1,
      ...createCatDto,
    };

    this.cats.push(newCat);

    const catCreatedEvent = new CatCreatedEvent();
    catCreatedEvent.name = createCatDto.name;
    catCreatedEvent.breed = createCatDto.breed;
    this.eventEmitter.emit('cat.created', catCreatedEvent);

    return newCat;
  }

  findAll() {
    return this.cats;
  }
}
