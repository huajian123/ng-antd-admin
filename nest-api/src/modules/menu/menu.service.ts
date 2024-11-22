import { Inject, Injectable } from '@nestjs/common';
import { FilterParam, TableDataInfo } from '../../common/result/result';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { menuTable } from '../../drizzle/schema';
import {
  and,
  asc,
  eq,
  getTableColumns,
  ilike,
  inArray,
  SQL,
} from 'drizzle-orm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenuService {
  constructor(
    @Inject(DrizzleAsyncProvider) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: CreateMenuDto) {
    await this.conn.insert(menuTable).values(data);
    return null;
  }

  async findAll(
    searchParam: FilterParam<Partial<CreateMenuDto>>,
    order: 'asc' | 'desc' = 'asc',
  ) {
    const filters: SQL[] = [];
    if (searchParam.filters?.menuName) {
      filters.push(
        ilike(menuTable.menuName, `%${searchParam.filters.menuName}%`),
      );
    }
    const list = await this.conn
      .select()
      .from(menuTable)
      .where(filters.length > 0 ? and(...filters) : undefined)
      .orderBy(asc(menuTable.orderNum));
    return TableDataInfo.result(list);
  }

  async findOne(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, deletedAt, ...res } =
      getTableColumns(menuTable);
    const data = await this.conn
      .select({ ...res })
      .from(menuTable)
      .where(eq(menuTable.id, id));
    return data[0];
  }

  async update(data: UpdateMenuDto) {
    const { id, ...obj } = data;
    await this.conn.update(menuTable).set(obj).where(eq(menuTable.id, id));
    return null;
  }

  async remove(ids: number[]) {
    if (ids.length === 0) return null; // 如果没有要删除的 ID，直接返回
    await this.conn.delete(menuTable).where(inArray(menuTable.id, ids));
    return null;
  }
}
