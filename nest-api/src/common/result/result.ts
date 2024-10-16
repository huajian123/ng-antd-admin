// https://blog.csdn.net/gaotlantis/article/details/139467995

import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FilterParam<T> {
  @IsNumber()
  pageNum: number;
  @IsNumber()
  pageSize: number;
  filters?: T;
}

export class BaseDomain {
  @ApiProperty({ description: '创建者', required: false })
  @IsString()
  @IsOptional()
  createBy?: string;
  @ApiProperty({ description: '创建时间', required: false })
  @IsString()
  @IsOptional()
  createTime?: string;
  @ApiProperty({ description: '更新者', required: false })
  @IsString()
  @IsOptional()
  updateBy?: string;
  @ApiProperty({ description: '更新时间', required: false })
  @IsString()
  @IsOptional()
  updateTime?: string;
  @ApiProperty({ description: '备注', required: false })
  @IsString()
  @IsOptional()
  remark?: string;
}

export class PageDomain {
  @ApiProperty({ description: '当前页码', required: false })
  @IsNumber()
  @IsOptional()
  @Transform((v) => +v.value)
  pageNum: number = 1;
  @ApiProperty({ description: '每页的数据条目', required: false })
  @IsNumber()
  @IsOptional()
  @Transform((v) => +v.value)
  pageSize: number = 10;
}

export class TableDataInfo<T> {
  @ApiProperty({
    example: 0,
    description: '总记录数',
  })
  total: number;
  @ApiProperty({
    example: 0,
    description: '总记录数',
  })
  pageSize: number;
  @ApiProperty({
    example: 0,
    description: '总记录数',
  })
  pageNumber: number;

  @ApiProperty({
    default: null,
    description: '列表数据',
  })
  list: T[];
  constructor(list: T[], total: number, pageSize: number, pageNumber: number) {
    this.total = total;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.list = list;
  }

  static result<U>(
    list: U[],
    total: number,
    pageSize: number,
    pageNum: number,
  ) {
    return new TableDataInfo(list, total, pageSize, pageNum);
  }
}

export class ResultData {
  constructor(
    public code = HttpStatus.OK,
    public msg = '',
    public data: any,
  ) {}

  static success<T>(data: T, msg = '') {
    return new ResultData(HttpStatus.OK, msg, data);
  }

  static fail<T>(code = HttpStatus.BAD_REQUEST, data: T, message = '') {
    return new ResultData(code, message, data);
  }
}
