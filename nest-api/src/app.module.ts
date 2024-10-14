import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { PermissionModule } from './permission/permission.module';
import { DepartmentModule } from './department/department.module';
import { ConfigModule } from '@nestjs/config';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoginModule,
    PermissionModule,
    DepartmentModule,
    ModulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
