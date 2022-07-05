import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgresql_12',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true,
    }),
    CatsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
