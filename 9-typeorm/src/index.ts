import { Logger } from '@nestjs/common';
import { AppDataSource } from './data-source';

AppDataSource.initialize()
  .then(async () => {
    Logger.log('Database connection is ok');
  })
  .catch((error) => console.log(error));
