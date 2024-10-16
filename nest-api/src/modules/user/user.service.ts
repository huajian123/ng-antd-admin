import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../common/database/prisma.service';
import { FilterParam, TableDataInfo } from '../../common/result/result';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return this.prisma.user.create({ data });
  }

  async findAll(searchParam: FilterParam<Partial<CreateUserDto>>) {
    const total = await this.prisma.user.count({
      where: searchParam.filters,
    });
    const list = await this.prisma.user.findMany({
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
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
