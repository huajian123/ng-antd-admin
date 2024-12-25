import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// https://ysx.cosine.ren/nest-learn-project-1/
// https://github.com/nestjs/awesome-nestjs#open-source
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('public'); // 配置静态资源

  const config = new DocumentBuilder()
    .setTitle('NgAntdAdmin Api')
    .setDescription('这里是ngAntdAdmin的nestjs api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
