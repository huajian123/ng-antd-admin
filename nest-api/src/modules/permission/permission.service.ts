import { Inject, Injectable } from '@nestjs/common';
import { PermissionAssignRoleMenuReqDto } from './dto/create-permission.dto';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { sysRolePermTable } from '../../drizzle/schema';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(DrizzleAsyncProvider) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async assignRolePermCode(data: PermissionAssignRoleMenuReqDto) {
    const { roleId, permCodes } = data;
    // 进行增删操作的事务
    await this.conn.transaction(async (db) => {
      await db
        .delete(sysRolePermTable)
        .where(eq(sysRolePermTable.roleId, roleId));

      await db.insert(sysRolePermTable).values(
        permCodes.map((permCode) => ({
          roleId,
          permCode,
        })),
      );
      return null;
    });
  }

  async getMenusPermissionByRoleId(roleId: number) {
    const data = await this.conn
      .select()
      .from(sysRolePermTable)
      .where(eq(sysRolePermTable.roleId, roleId));

    console.log(data);
    // const data = await this.prisma.sysRoleMenu.findMany({
    //   where: {
    //     roleId,
    //   },
    //   select: {
    //     menuId: true,
    //   },
    // });
    return data.map((item) => item.permCode);
  }
  //
  // findOne(id: number) {
  //   return `This action returns a #${id} permission`;
  // }
  //
  // update(id: number, updatePermissionDto: UpdatePermissionDto) {
  //   return `This action updates a #${id} permission`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} permission`;
  // }
}
