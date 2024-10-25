import { Injectable } from '@nestjs/common';
import {
  CreatePermissionDto,
  PermissionAssignRoleMenuReqDto,
} from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from '../../common/database/prisma.service';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  assignRoleMenu(data: PermissionAssignRoleMenuReqDto) {
    // this.prisma.sysRoleMenu.upsert();
    return;
  }

  findAll() {
    return `This action returns all permission`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
