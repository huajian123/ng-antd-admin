import { ApiProperty } from '@nestjs/swagger';

export class PermissionAssignRoleMenuReqDto {
  @ApiProperty({ description: '角色id', example: '1' })
  roleId: number;
  @ApiProperty({ description: '该角色拥有的所有权限码' + '', example: '1' })
  permCodes: string[];
}

export class CreatePermissionDto {
  @ApiProperty({ description: '角色id', example: '1' })
  roleId: string;
  @ApiProperty({ description: '菜单id', example: '1' })
  menuId: number;
}
