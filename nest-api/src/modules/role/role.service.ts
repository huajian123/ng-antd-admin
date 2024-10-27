import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../../common/database/prisma.service';
import { FilterParam, TableDataInfo } from '../../common/result/result';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRoleDto) {
    await this.prisma.role.create({ data });
    return null;
  }

  async findAll(searchParam: FilterParam<Partial<CreateRoleDto>>) {
    const total = await this.prisma.role.count({
      where: searchParam.filters,
    });
    const list = await this.prisma.role.findMany({
      where: searchParam.filters,
      skip:
        searchParam.pageSize > 0
          ? (searchParam.pageIndex - 1) * searchParam.pageSize
          : undefined,
      take: searchParam.pageSize > 0 ? searchParam.pageSize : undefined,
    });

    return TableDataInfo.result(
      list,
      searchParam.pageSize,
      searchParam.pageIndex,
      total,
    );
  }

  findOne(id: number) {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  async update(data: UpdateRoleDto) {
    await this.prisma.role.update({
      where: {
        id: data.id,
      },
      data,
    });
    return null;
  }

  async remove(ids: number[]) {
    await this.prisma.role.deleteMany({
      where: {
        id: { in: ids },
      },
    });
    return null;
  }
}
