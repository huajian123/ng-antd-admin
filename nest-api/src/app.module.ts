import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { PermissionModule } from './permission/permission.module';
import { DepartmentModule } from './department/department.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [LoginModule, PermissionModule, DepartmentModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
