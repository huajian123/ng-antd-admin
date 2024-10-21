import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { PrismaService } from '../../common/database/prisma.service';
import { FilterParam, TableDataInfo } from '../../common/result/result';
import { CreateDepartmentDto } from '../department/dto/create-department.dto';

@Injectable()
export class MenuService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMenuDto) {
    await this.prisma.menu.create({ data });
    return null;
  }

  async findAll(
    searchParam: FilterParam<Partial<CreateDepartmentDto>>,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const list = await this.prisma.menu.findMany({
      where: searchParam.filters,
      orderBy: {
        orderNum: order,
      },
    });
    return TableDataInfo.result(list);
  }

  async findOne(id: number) {
    return this.prisma.menu.findUnique({
      where: {
        id,
      },
    });
  }

  async update(data: UpdateMenuDto) {
    await this.prisma.menu.update({
      where: {
        id: data.id,
      },
      data,
    });
    return null;
  }

  async remove(ids: number[]) {
    await this.prisma.menu.deleteMany({
      where: {
        id: { in: ids },
      },
    });
    return null;
  }
}
