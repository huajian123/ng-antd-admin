import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ApiModulesModule } from './modules/api-modules.module';
import { DrizzleModule } from './drizzle/drizzle.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import * as process from 'node:process';
// import * as dotenv from 'dotenv'; // 读取环境变量文件
import * as Joi from 'joi'; // 对环境变量进行校验

// 环境变量加载顺序，数组元素索引靠前的优先级高
const envFilePath = [`.env.${process.env.NODE_ENV || 'development'}`, '.env'];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      // 合并.env文件的默认配置
      // load: [() => dotenv.config({ path: '.env' })],
      // 对环境变量进行校验
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        DATABASE_URL: Joi.string(),
        // DB_HOST: Joi.string().ip()
      }),
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
