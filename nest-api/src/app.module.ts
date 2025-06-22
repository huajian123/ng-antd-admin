import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApiModulesModule } from './modules/api-modules.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from './common/config/config.module';

@Module({
  imports: [
    ConfigModule,
    // 临时数据可以存放，不能存放敏感数据
    CacheModule.register({ isGlobal: true }),
    DrizzleModule,
    ApiModulesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
