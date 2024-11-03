import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { sysUserRoleTable, userTable } from '../../drizzle/schema';
import { FilterParam, TableDataInfo } from '../../common/result/result';
import { and, asc, SQL } from 'drizzle-orm';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { FilterParam, TableDataInfo } from '../../common/result/result';

@Injectable()
export class UserService {
  constructor(
    @Inject(DrizzleAsyncProvider) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: CreateUserDto) {
    const { roleId, ...user } = data;
    await this.conn.transaction(async (db) => {
      //更新用户信息
      const addUser = await db
        .insert(userTable)
        .values(user)
        .returning({ id: userTable.id });

      // 更新用户角色表信息
      await db
        .insert(sysUserRoleTable)
        .values(roleId.map((v) => ({ userId: addUser[0].id, roleId: v })));
    });
    return null;
  }

  async findAll(searchParam: FilterParam<Partial<CreateUserDto>>) {
    const filters: SQL[] = [];
    const { total, list } = await this.conn.transaction(async (db) => {
      // 计算符合条件的记录总数
      const total = await this.conn.$count(
        userTable,
        filters.length > 0 ? and(...filters) : undefined,
      );

      const pageSize =
        searchParam.pageSize > 0 ? searchParam.pageSize : undefined;
      const pageIndex =
        searchParam.pageSize > 0
          ? (searchParam.pageIndex - 1) * searchParam.pageSize
          : undefined;

      const list = await this.conn
        .select()
        .from(userTable)
        .where(filters.length > 0 ? and(...filters) : undefined)
        .orderBy(asc(userTable.id))
        .limit(pageSize)
        .offset(pageIndex);

      // 提取所有相关的 departmentId
      // const deptIds = list.map((user) => user.departmentId);
      // const deptInfos = await db.department.findMany({
      //   where: {
      //     id: { in: deptIds },
      //   },
      // });
      // return { total, list, deptInfos };
      return { total, list };
    });

    // const deptMap = Object.fromEntries(
    //   deptInfos.map((dept) => [dept.id, dept.departmentName]),
    // );
    //
    // // 为每个用户设置对应的 departmentName
    // list.forEach((item) => {
    //   item.departmentName = deptMap[item.departmentId] || null; // 设置部门名称
    // });

    return TableDataInfo.result(
      list,
      searchParam.pageSize,
      searchParam.pageIndex,
      total,
    );
  }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }
  //
  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
