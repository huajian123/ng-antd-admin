import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../../common/database/prisma.service';
import { FilterParam, TableDataInfo } from '../../common/result/result';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRoleDto) {
    console.log(data);
    await this.prisma.role.create({ data });
    return null;
  }

  async findAll(searchParam: FilterParam<Partial<CreateRoleDto>>) {
    const total = await this.prisma.role.count({
      where: searchParam.filters,
    });
    const list = await this.prisma.role.findMany({
      where: searchParam.filters,
      skip: (searchParam.pageNum - 1) * searchParam.pageSize,
      take: searchParam.pageSize,
    });
    return TableDataInfo.result(
      list,
      total,
      searchParam.pageSize,
      searchParam.pageNum,
    );
  }

  findOne(id: number) {
    return this.prisma.role.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
