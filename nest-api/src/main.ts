import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
// https://ysx.cosine.ren/nest-learn-project-1/
// https://github.com/nestjs/awesome-nestjs#open-source
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public'); // 配置静态资源
  await app.listen(3000);
}
bootstrap();
