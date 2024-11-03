import { Inject, Injectable } from '@nestjs/common';
import { PermissionAssignRoleMenuReqDto } from './dto/create-permission.dto';
import { DrizzleAsyncProvider } from '../../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { sysRoleMenuTable } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class PermissionService {
  constructor(
    @Inject(DrizzleAsyncProvider) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async assignRoleMenu(data: PermissionAssignRoleMenuReqDto) {
    const { roleId, permissionIds } = data;
    // 进行增删操作的事务
    await this.conn.transaction(async (db) => {
      await db
        .delete(sysRoleMenuTable)
        .where(eq(sysRoleMenuTable.roleId, roleId));

      await db.insert(sysRoleMenuTable).values(
        permissionIds.map((menuId) => ({
          roleId,
          menuId,
        })),
      );
      return null;
    });
  }

  async getMenusPermissionByRoleId(roleId: number) {
    const data = await this.conn
      .select()
      .from(sysRoleMenuTable)
      .where(eq(sysRoleMenuTable.roleId, roleId));

    console.log(data);
    // const data = await this.prisma.sysRoleMenu.findMany({
    //   where: {
    //     roleId,
    //   },
    //   select: {
    //     menuId: true,
    //   },
    // });
    return data.map((item) => item.menuId);
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
