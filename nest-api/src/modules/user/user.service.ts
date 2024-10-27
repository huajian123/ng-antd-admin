import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../common/database/prisma.service';
import { FilterParam, TableDataInfo } from '../../common/result/result';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const { roleId, ...user } = data;
    await this.prisma.$transaction(async (db) => {
      //更新用户信息
      const addUser = await db.user.create({
        data: user,
      });
      // 更新用户角色表信息
      await db.sysUserRole.createMany({
        data: roleId.map((v) => ({ userId: addUser.id, roleId: v })),
      });
    });
    return null;
  }

  async findAll(searchParam: FilterParam<Partial<CreateUserDto>>) {
    const { total, list, deptInfos } = await this.prisma.$transaction(
      async (db) => {
        const total = await db.user.count({
          where: searchParam.filters,
        });
        const list = await db.user.findMany({
          where: searchParam.filters,
          skip: (searchParam.pageIndex - 1) * searchParam.pageSize,
          take: searchParam.pageSize,
        });

        // 提取所有相关的 departmentId
        const deptIds = list.map((user) => user.departmentId);
        const deptInfos = await db.department.findMany({
          where: {
            id: { in: deptIds },
          },
        });
        return { total, list, deptInfos };
      },
    );

    const deptMap = Object.fromEntries(
      deptInfos.map((dept) => [dept.id, dept.departmentName]),
    );

    // 为每个用户设置对应的 departmentName
    list.forEach((item) => {
      item.departmentName = deptMap[item.departmentId] || null; // 设置部门名称
    });

    return TableDataInfo.result(
      list,
      searchParam.pageSize,
      searchParam.pageIndex,
      total,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
