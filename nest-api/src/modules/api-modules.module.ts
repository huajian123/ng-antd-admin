import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [UserModule, RoleModule, DepartmentModule],
})
export class ApiModulesModule {}
