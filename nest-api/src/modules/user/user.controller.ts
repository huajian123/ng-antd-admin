import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ResultData } from '../../common/result/result';
import { TableSearchFilterDto } from '../../common/tableSearchDto';
import { UpdateRoleDto } from '../role/dto/update-role.dto';

@ApiTags('用户管理') // 规整到user的swagger tag中
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.create(createUserDto);
    return ResultData.success(data);
  }

  @Post('list')
  async findAll(@Body() searchParam: TableSearchFilterDto<CreateUserDto>) {
    const data = await this.userService.findAll(searchParam);
    return ResultData.success(data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.findOne(id);
    return ResultData.success(data);
  }
  @Put('update')
  async update(@Body() updateRoleDto: UpdateRoleDto) {
    const data = await this.userService.update(updateRoleDto);
    return ResultData.success(data);
  }
  @Post('del')
  async remove(@Body() { ids }: { ids: number[] }) {
    const data = await this.userService.remove(ids);
    return ResultData.success(data);
  }
}
