import { Inject, Injectable } from '@nestjs/common';
import { FilterParam, TableDataInfo } from '../../common/result/result';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import {
  and,
  asc,
  eq,
  getTableColumns,
  ilike,
  inArray,
  SQL,
} from 'drizzle-orm';
import { departmentTable } from '../../drizzle/schema';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @Inject(DrizzleAsyncProvider) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: CreateDepartmentDto) {
    await this.conn.insert(departmentTable).values(data);
    return null;
  }

  async findAll(
    searchParam: FilterParam<Partial<CreateDepartmentDto>>,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const filters: SQL[] = [];
    if (searchParam.filters?.departmentName) {
      filters.push(
        ilike(
          departmentTable.departmentName,
          `%${searchParam.filters.departmentName}%`,
        ),
      );
    }
    const list = await this.conn
      .select()
      .from(departmentTable)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .orderBy(asc(departmentTable.orderNum));
    return TableDataInfo.result(list);
  }

  async findOne(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, deletedAt, ...res } =
      getTableColumns(departmentTable);
    const data = await this.conn
      .select({ ...res })
      .from(departmentTable)
      .where(eq(departmentTable.id, id));
    return data[0];
  }

  async update(data: UpdateDepartmentDto) {
    const { id, ...obj } = data;
    await this.conn
      .update(departmentTable)
      .set(obj)
      .where(eq(departmentTable.id, id));
    return null;
  }

  async remove(ids: number[]) {
    if (ids.length === 0) return null; // 如果没有要删除的 ID，直接返回
    await this.conn
      .delete(departmentTable)
      .where(inArray(departmentTable.id, ids));
    return null;
  }
}
