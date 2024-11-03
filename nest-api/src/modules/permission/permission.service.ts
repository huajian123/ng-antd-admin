import { Injectable } from '@nestjs/common';

@Injectable()
export class PermissionService {
  constructor() {}

  // async assignRoleMenu(data: PermissionAssignRoleMenuReqDto) {
  //   const { roleId, permissionIds } = data;
  //   // 进行增删操作的事务
  //   await this.prisma.$transaction(async (db) => {
  //     await db.sysRoleMenu.deleteMany({
  //       where: {
  //         roleId,
  //       },
  //     });
  //
  //     await db.sysRoleMenu.createMany({
  //       data: permissionIds.map((menuId) => ({
  //         roleId,
  //         menuId,
  //       })),
  //     });
  //     return null;
  //   });
  // }
  //
  // async getMenusPermissionByRoleId(roleId: number) {
  //   const data = await this.prisma.sysRoleMenu.findMany({
  //     where: {
  //       roleId,
  //     },
  //     select: {
  //       menuId: true,
  //     },
  //   });
  //   return data.map((item) => item.menuId);
  // }
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
