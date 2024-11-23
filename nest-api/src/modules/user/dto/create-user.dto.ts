import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: '用户名称', required: true })
  userName: string;
  @ApiProperty({ description: '是否禁用', default: false })
  available: boolean;
  @ApiProperty({ description: '性别(0:女 1:男)' })
  sex: 0 | 1;
  @ApiProperty({ description: '手机号' })
  mobile: string;
  @ApiProperty({ description: '邮箱' })
  email: string;
  @ApiProperty({ description: '密码' })
  password: string;
  @ApiProperty({ description: '最后登录时间' })
  lastLoginTime: Date;
  @ApiProperty({ description: '创建时间' })
  createdTime: Date;
  @ApiProperty({ description: '电话号码' })
  telephone: string;
  @ApiProperty({ description: '角色' })
  roleId: number[];
  @ApiProperty({ description: '部门id' })
  departmentId: number;
  @ApiProperty({ description: '部门名称' })
  departmentName?: string;
}
