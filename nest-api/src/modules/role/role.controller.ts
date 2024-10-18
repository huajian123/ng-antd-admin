import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { TableSearchFilterDto } from '../../common/tableSearchDto';
import { ResultData } from '../../common/result/result';
@ApiTags('角色管理') // 规整到user的swagger tag中
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  async create(@Body() createRoleDto: CreateRoleDto) {
    const data = await this.roleService.create(createRoleDto);
    return ResultData.success(data);
  }

  @Post('list')
  async findAll(@Body() searchParam: TableSearchFilterDto<CreateRoleDto>) {
    const data = await this.roleService.findAll(searchParam);
    return ResultData.success(data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.roleService.findOne(id);
    return ResultData.success(data);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
