import { createNewDocsInstanceMaker } from '../common/utils/create-new-docs-maker';
import { CatsModule } from './cats.module';

export const createCatsDocs = createNewDocsInstanceMaker({
  path: 'api/cats',
  title: 'Cats API',
  module: CatsModule,
});
