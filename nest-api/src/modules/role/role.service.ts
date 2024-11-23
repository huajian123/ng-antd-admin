import { Inject, Injectable } from '@nestjs/common';
import { FilterParam, TableDataInfo } from '../../common/result/result';
import { CreateRoleDto } from './dto/create-role.dto';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { roleTable } from '../../drizzle/schema';
import {
  and,
  asc,
  eq,
  getTableColumns,
  ilike,
  inArray,
  SQL,
} from 'drizzle-orm';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject(DrizzleAsyncProvider) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: CreateRoleDto) {
    await this.conn.insert(roleTable).values(data);
    return null;
  }

  async findAll(searchParam: FilterParam<Partial<CreateRoleDto>>) {
    const filters: SQL[] = [];
    if (searchParam.filters?.roleName) {
      filters.push(
        ilike(roleTable.roleName, `%${searchParam.filters.roleName}%`),
      );
    }
    if (searchParam.filters?.roleDesc) {
      filters.push(
        ilike(roleTable.roleDesc, `%${searchParam.filters.roleDesc}%`),
      );
    }
    // 计算符合条件的记录总数
    const total = await this.conn.$count(
      roleTable,
      filters.length > 0 ? and(...filters) : undefined,
    );

    const pageSize =
      searchParam.pageSize > 0 ? searchParam.pageSize : undefined;
    const pageIndex =
      searchParam.pageSize > 0
        ? (searchParam.pageIndex - 1) * searchParam.pageSize
        : undefined;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, deletedAt, ...res } =
      getTableColumns(roleTable);

    const list = await this.conn
      .select({ ...res })
      .from(roleTable)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .orderBy(asc(roleTable.id))
      .limit(pageSize)
      .offset(pageIndex);
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
      getTableColumns(roleTable);
    const data = await this.conn
      .select({ ...res })
      .from(roleTable)
      .where(eq(roleTable.id, id));
    return data[0];
  }

  async update(data: UpdateRoleDto) {
    const { id, ...obj } = data;
    await this.conn.update(roleTable).set(obj).where(eq(roleTable.id, id));
    return null;
  }

  async remove(ids: number[]) {
    if (ids.length === 0) return null; // 如果没有要删除的 ID，直接返回
    await this.conn.delete(roleTable).where(inArray(roleTable.id, ids));
    return null;
  }
}
