import { INestApplication } from '@nestjs/common';
import { createCatsDocs } from '../../cats/cats.docs';
import { createDogsDocs } from '../../dogs/dogs.docs';

const docBuilders = [createCatsDocs, createDogsDocs];

export default (app: INestApplication) => {
  docBuilders.forEach((buildDocs) => buildDocs(app));
};
