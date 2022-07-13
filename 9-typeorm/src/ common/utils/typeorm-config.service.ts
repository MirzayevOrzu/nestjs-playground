import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ENV } from '../constants/env';
import { NodeEnv } from '../constants/node-env';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get(ENV.DB_CLIENT),
      host: this.configService.get(ENV.DB_HOST),
      port: this.configService.get(ENV.DB_PORT),
      username: this.configService.get(ENV.DB_USER),
      password: this.configService.get(ENV.DB_PASSWORD),
      database: this.configService.get(ENV.DB_NAME),
      autoLoadEntities: true,
      synchronize: this.configService.get(ENV.NODE_ENV) !== NodeEnv.PRODUCTION,
    } as TypeOrmModuleOptions;
  }
}
