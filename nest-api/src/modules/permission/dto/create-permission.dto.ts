import { ApiProperty } from '@nestjs/swagger';

export class PermissionAssignRoleMenuReqDto {
  @ApiProperty({ description: '角色id', example: '1' })
  roleId: number;
  @ApiProperty({ description: '该角色拥有的所有菜单id' + '', example: '1' })
  permissionIds: number[];
}

export class CreatePermissionDto {
  @ApiProperty({ description: '角色id', example: '1' })
  roleId: string;
  @ApiProperty({ description: '菜单id', example: '1' })
  menuId: number;
}
