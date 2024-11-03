import { Controller } from '@nestjs/common';
import { DepartmentService } from './department.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('部门管理') // 规整到user的swagger tag中
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}
  //
  // @Post('create')
  // async create(@Body() createDepartmentDto: CreateDepartmentDto) {
  //   const data = await this.departmentService.create(createDepartmentDto);
  //   return ResultData.success(data);
  // }
  //
  // @Post('list')
  // async findAll(
  //   @Body() searchParam: TableSearchFilterDto<CreateDepartmentDto>,
  // ) {
  //   const data = await this.departmentService.findAll(searchParam, 'desc');
  //   return ResultData.success(data);
  // }
  //
  // @Get(':id')
  // async findOne(@Param('id', ParseIntPipe) id: number) {
  //   const data = await this.departmentService.findOne(id);
  //   return ResultData.success(data);
  // }
  //
  // @Put('update')
  // async update(@Body() updateDepartmentDto: UpdateDepartmentDto) {
  //   const data = await this.departmentService.update(updateDepartmentDto);
  //   return ResultData.success(data);
  // }
  //
  // @Post('del')
  // async remove(@Body() { ids }: { ids: number[] }) {
  //   const data = await this.departmentService.remove(ids);
  //   return ResultData.success(data);
  // }
}
