import { Injectable } from '@nestjs/common';

export type Cat = {
  id: number;
  name: string;
  breed: string;
};

@Injectable()
export class CatsService {
  cats: Cat[];

  constructor() {
    this.cats = [
      {
        id: 1,
        name: 'Mallavoy',
        breed: 'Egyptian',
      },
      {
        id: 2,
        name: 'Koshka',
        breed: 'Dog like',
      },
    ];
  }

  create(cat: Cat) {
    this.cats.push({ id: this.cats.length + 1, ...cat });

    return this.cats[this.cats.length - 1];
  }

  findOne(id: number) {
    return this.cats.find((cat) => cat.id == id);
  }

  findAll() {
    return this.cats;
  }

  update(id: number, payload: Cat) {
    const cat = this.findOne(id);
    this.cats.splice(this.cats.indexOf(cat), 1, {
      id,
      ...cat,
      ...payload,
    });

    return this.findOne(id);
  }

  remove(id: number) {
    return this.cats.splice(this.cats.indexOf(this.findOne(id)), 1);
  }
}
