import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import {
  departmentTable,
  sysRolePermTable,
  sysUserRoleTable,
  userTable,
} from '../../drizzle/schema';
import { FilterParam, TableDataInfo } from '../../common/result/result';
import {
  and,
  asc,
  eq,
  getTableColumns,
  ilike,
  inArray,
  SQL,
} from 'drizzle-orm';
import { extractField } from 'src/untils';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findOneByUserName(userName: string) {
    const userInfo = await this.conn
      .select({
        id: userTable.id,
        password: userTable.password,
      })
      .from(userTable)
      .where(eq(userTable.userName, userName));
    return userInfo[0] || null;
  }

  async findAll(searchParam: FilterParam<Partial<CreateUserDto>>) {
    const filters: SQL[] = [];
    if (searchParam.filters?.userName) {
      filters.push(
        ilike(userTable.userName, `${searchParam.filters.userName}`),
      );
    }

    const { total, list } = await this.conn.transaction(async (db) => {
      // 计算符合条件的记录总数
      const total = await db.$count(
        userTable,
        filters.length > 0 ? and(...filters) : undefined,
      );

      const pageSize =
        searchParam.pageSize > 0 ? searchParam.pageSize : undefined;
      const pageIndex =
        searchParam.pageSize > 0
          ? (searchParam.pageIndex - 1) * searchParam.pageSize
          : undefined;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, updatedAt, deletedAt, ...userColumns } =
        getTableColumns(userTable);
      const list = await db
        .select({
          ...userColumns,
          departmentName: departmentTable.departmentName,
        })
        .from(userTable)
        .leftJoin(
          departmentTable,
          eq(userTable.departmentId, departmentTable.id),
        )
        .where(filters.length > 0 ? and(...filters) : undefined)
        .orderBy(asc(userTable.id))
        .limit(pageSize)
        .offset(pageIndex);

      return { total, list };
    });
    return TableDataInfo.result(
      list,
      searchParam.pageSize,
      searchParam.pageIndex,
      total,
    );
  }

  async findOne(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, deletedAt, ...res } =
      getTableColumns(userTable);
    const { result, roleIdArray } = await this.conn.transaction(async (db) => {
      const data = await db
        .select({ ...res })
        .from(userTable)
        .where(eq(userTable.id, id));
      const roleIds = await db
        .select({ roleId: sysUserRoleTable.roleId })
        .from(sysUserRoleTable)
        .where(eq(sysUserRoleTable.userId, id));
      const roleIdArray = extractField(roleIds, 'roleId');
      return { result: data[0], roleIdArray };
    });

    return { ...result, roleId: roleIdArray };
  }

  async findOneAuthCode(id: number) {
    const autoCodeArray = [];
    // 子查询：获取用户的角色 ID 列表
    const roleIdsSubquery = this.conn
      .select({ roleId: sysUserRoleTable.roleId })
      .from(sysUserRoleTable)
      .where(eq(sysUserRoleTable.userId, id));

    // 使用子查询作为条件来查找权限码
    const data = await this.conn
      .selectDistinctOn([sysRolePermTable.permCode])
      .from(sysRolePermTable)
      .where(inArray(sysRolePermTable.roleId, roleIdsSubquery));
    data.forEach((item) => {
      autoCodeArray.push(item.permCode);
    });
    return autoCodeArray;
  }

  async update(data: UpdateUserDto) {
    const { id, ...obj } = data;
    await this.conn.transaction(async (db) => {
      await db.update(userTable).set(obj).where(eq(userTable.id, id));
      await db.delete(sysUserRoleTable).where(eq(sysUserRoleTable.userId, id));
      await db.insert(sysUserRoleTable).values(
        obj.roleId.map((rId) => ({
          userId: id,
          roleId: rId,
        })),
      );
    });

    return null;
  }

  async remove(ids: number[]) {
    if (ids.length === 0) return null; // 如果没有要删除的 ID，直接返回
    await this.conn.transaction(async (db) => {
      await db.delete(userTable).where(inArray(userTable.id, ids));
      await db
        .delete(sysUserRoleTable)
        .where(inArray(sysUserRoleTable.userId, ids));
    });

    return null;
  }
}
