import { createNewDocsInstanceMaker } from '../common/utils/create-new-docs-maker';
import { DogsModule } from './dogs.module';

export const createDogsDocs = createNewDocsInstanceMaker({
  path: 'api/dogs',
  title: 'Dogs API',
  module: DogsModule,
});
