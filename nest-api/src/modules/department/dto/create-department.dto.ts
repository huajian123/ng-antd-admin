import { ApiProperty } from '@nestjs/swagger';

export class CreateDepartmentDto {
  @ApiProperty({
    description: '部门名称',
    required: true,
    example: '超级管理员',
  })
  departmentName: string;
  @ApiProperty({ description: '父级id，第一级为0', example: '0' })
  fatherId: number;
  @ApiProperty({ description: '排序', example: '0' })
  orderNum: number;
  @ApiProperty({ description: '状态(是否启用)', example: 'true' })
  state: boolean;
}
