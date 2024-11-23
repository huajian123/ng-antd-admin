import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DepartmentService } from './department.service';

import { ApiTags } from '@nestjs/swagger';
import { TableSearchFilterDto } from '../../common/tableSearchDto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { ResultData } from '../../common/result/result';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { JwtGuard } from '../../guards/jwt.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { Permission } from '../../decorators/permission.decorator';

@ApiTags('部门管理') // 规整到user的swagger tag中
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Post('create')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:dept:add')
  async create(@Body() createDepartmentDto: CreateDepartmentDto) {
    const data = await this.departmentService.create(createDepartmentDto);
    return ResultData.success(data);
  }

  @Post('list')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:dept')
  async findAll(
    @Body() searchParam: TableSearchFilterDto<CreateDepartmentDto>,
  ) {
    const data = await this.departmentService.findAll(searchParam, 'desc');
    return ResultData.success(data);
  }

  @Get(':id')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:dept')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.departmentService.findOne(id);
    return ResultData.success(data);
  }

  @Put('update')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:dept:edit')
  async update(@Body() updateDepartmentDto: UpdateDepartmentDto) {
    const data = await this.departmentService.update(updateDepartmentDto);
    return ResultData.success(data);
  }

  @Post('del')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:dept:del')
  async remove(@Body() { ids }: { ids: number[] }) {
    const data = await this.departmentService.remove(ids);
    return ResultData.success(data);
  }
}
