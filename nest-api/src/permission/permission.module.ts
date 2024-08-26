import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { RoleController } from './role.controller';
import { PermissionController } from './permission.controller';
import { SysPermissionController } from './sys-permission.controller';

@Module({
  controllers: [
    MenuController,
    RoleController,
    PermissionController,
    SysPermissionController,
  ],
})
export class PermissionModule {}
