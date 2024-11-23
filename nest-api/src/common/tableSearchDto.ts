import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class TableSearchFilterDto<T> {
  @ApiProperty({ description: '页码', example: 1 })
  @IsNotEmpty({ message: '页码不能为空' })
  @Transform((v) => +v.value)
  @IsNumber()
  pageIndex: number;
  @ApiProperty({ description: '页面条数', example: 10 })
  @IsNotEmpty({ message: '页面条数不能为空' })
  @Transform((v) => +v.value)
  @IsNumber()
  pageSize: number;
  @ApiProperty({ description: '创建时间', required: false })
  @IsOptional()
  filters?: T;
}
