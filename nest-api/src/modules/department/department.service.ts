import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../../common/database/prisma.service';
import { FilterParam, TableDataInfo } from '../../common/result/result';

@Injectable()
export class DepartmentService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDepartmentDto) {
    await this.prisma.department.create({ data });
    return null;
  }

  async findAll(
    searchParam: FilterParam<Partial<CreateDepartmentDto>>,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const list = await this.prisma.department.findMany({
      where: searchParam.filters,
      orderBy: {
        orderNum: order,
      },
    });
    return TableDataInfo.result(list);
  }

  findOne(id: number) {
    return this.prisma.department.findUnique({
      where: {
        id,
      },
    });
  }

  async update(data: UpdateDepartmentDto) {
    await this.prisma.department.update({
      where: {
        id: data.id,
      },
      data,
    });
    return null;
  }

  async remove(ids: number[]) {
    await this.prisma.department.deleteMany({
      where: {
        id: { in: ids },
      },
    });
    return null;
  }
}
