import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [CaslModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
