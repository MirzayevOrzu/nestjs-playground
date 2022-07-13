import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Article } from './articles/entities/article.entity';
import { Article1657701776235 } from './migration/1657701776235-Article';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgresql_12',
  database: 'postgres',
  synchronize: true,
  logging: false,
  entities: [Article],
  migrations: [Article1657701776235],
  subscribers: [],
});
