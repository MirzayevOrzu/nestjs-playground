import { Module, CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CacheModule.register({
      ttl: 5 * 60,
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgresql_12',
      database: 'mydb',
      autoLoadModels: true,
      synchronize: true,
    }),
    CatsModule,
    UsersModule,
    AuthModule,
  ]
})
export class AppModule { }
