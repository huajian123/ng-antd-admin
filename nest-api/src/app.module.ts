import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { PermissionModule } from './permission/permission.module';
import { DepartmentModule } from './department/department.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModulesModule } from './modules/api-modules.module';
import { PrismaModule } from './common/database/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoginModule,
    PermissionModule,
    DepartmentModule,
    PrismaModule,
    ApiModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
