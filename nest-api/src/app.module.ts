import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModulesModule } from './modules/api-modules.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as process from 'node:process';
import * as dotenv from 'dotenv';
const envFilePath = `.env.${process.env.NODE_ENV || 'development'}`;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      load: [() => dotenv.config({ path: '.env' })],
    }),
    CacheModule.register({ isGlobal: true }),
    DrizzleModule,
    ApiModulesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
