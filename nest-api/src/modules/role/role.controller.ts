import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';

import { ApiTags } from '@nestjs/swagger';
import { TableSearchFilterDto } from '../../common/tableSearchDto';
import { CreateRoleDto } from './dto/create-role.dto';
import { ResultData } from '../../common/result/result';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtGuard } from '../../guards/jwt.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { Permission } from '../../decorators/permission.decorator';

@ApiTags('角色管理') // 规整到user的swagger tag中
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:role-manager:add')
  async create(@Body() createRoleDto: CreateRoleDto) {
    const data = await this.roleService.create(createRoleDto);
    return ResultData.success(data);
  }

  @Post('list')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:role-manager')
  async findAll(
    @Body() searchParam: TableSearchFilterDto<CreateRoleDto>,
    // 这里req中的user是通过AuthGuard('jwt')中的validate方法返回的，由passportModule自动添加
    // @Req() req,
  ) {
    const data = await this.roleService.findAll(searchParam);
    return ResultData.success(data);
  }

  @Get(':id')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:role-manager')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.roleService.findOne(id);
    return ResultData.success(data);
  }

  @Put('update')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:role-manager:edit')
  async update(@Body() updateRoleDto: UpdateRoleDto) {
    const data = await this.roleService.update(updateRoleDto);
    return ResultData.success(data);
  }

  @Post('del')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:role-manager:del')
  async remove(@Body() { ids }: { ids: number[] }) {
    const data = await this.roleService.remove(ids);
    return ResultData.success(data);
  }
}
