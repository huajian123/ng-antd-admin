import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { DepartmentModule } from './department/department.module';
import { MenuModule } from './menu/menu.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    UserModule,
    RoleModule,
    DepartmentModule,
    MenuModule,
    PermissionModule,
  ],
})
export class ApiModulesModule {}
