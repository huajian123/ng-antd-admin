import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: '角色名称',
    required: true,
    example: '超级管理员',
  })
  roleName: string;
  @ApiProperty({ description: '角色描述', example: '拥有至高无上的权限' })
  roleDesc: string;
}
