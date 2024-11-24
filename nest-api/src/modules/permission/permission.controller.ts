import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionAssignRoleMenuReqDto } from './dto/create-permission.dto';
import { ResultData } from '../../common/result/result';
import { JwtGuard } from '../../guards/jwt.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { Permission } from '../../decorators/permission.decorator';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  // 赋予角色权限码
  @Post('assign-role-menu')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:role-manager:set-role')
  assignRoleMenu(@Body() data: PermissionAssignRoleMenuReqDto) {
    return ResultData.success(this.permissionService.assignRolePermCode(data));
  }

  // 获得角色所拥有的菜单编号
  @Get('list-role-resources/:roleId')
  async getMenusPermissionByRoleId(
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    const data =
      await this.permissionService.getMenusPermissionByRoleId(roleId);
    return ResultData.success(data);
  }
}
