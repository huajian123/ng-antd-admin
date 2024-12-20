import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMenuDto {
  @IsOptional()
  @ApiProperty({
    description: '阿里图标',
    example: '超级管理员',
  })
  alIcon: string;
  @IsOptional()
  @ApiProperty({
    description: 'zorro图标',
    example: 'icon-mel-help',
  })
  icon: string;
  @IsNotEmpty()
  @ApiProperty({
    description: '图形编辑器',
    example: 'left',
  })
  menuName: string;
  @ApiProperty({
    description: 'C:菜单，F:按钮',
    example: 'C',
  })
  menuType: string;
  @ApiProperty({
    description: '路由地址',
    example: '/default/page-demo/flow',
  })
  path: string;
  @ApiProperty({ description: '权限码', example: 'default:dashboard' })
  code: string;
  @ApiProperty({ description: '排序', example: '0' })
  orderNum: number;
  @ApiProperty({ description: '父节点Id', example: '一级节点为0' })
  fatherId: number;
  @ApiProperty({ description: '状态(是否可用)', example: 'true' })
  status: boolean;
  @ApiProperty({ description: '外链标记', example: 'false' })
  newLinkFlag: boolean;
  @ApiProperty({ description: '是否展示', example: 'true' })
  visible: boolean;
}
