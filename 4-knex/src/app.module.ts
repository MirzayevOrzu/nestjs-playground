import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { KnexModule } from 'nest-knexjs';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        version: '12',
        useNullAsDefault: true,
        connection: {
          host: '127.0.0.1',
          user: 'postgres',
          password: 'postgresql_12',
          database: 'mydb',
        },
      },
    }),
    AuthModule,
    UsersModule,
    TodosModule,
  ],
})
export class AppModule {}
