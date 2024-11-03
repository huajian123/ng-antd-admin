import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { TableSearchFilterDto } from '../../common/tableSearchDto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { ResultData } from '../../common/result/result';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('create')
  async create(@Body() createMenuDto: CreateMenuDto) {
    const data = await this.menuService.create(createMenuDto);
    return ResultData.success(data);
  }

  @Post('list')
  async findAll(@Body() searchParam: TableSearchFilterDto<CreateMenuDto>) {
    const data = await this.menuService.findAll(searchParam, 'desc');
    return ResultData.success(data);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.menuService.findOne(id);
    return ResultData.success(data);
  }

  @Put('update')
  async update(@Body() updateMenuDto: UpdateMenuDto) {
    const data = await this.menuService.update(updateMenuDto);
    return ResultData.success(data);
  }

  @Post('del')
  async remove(@Body() { ids }: { ids: number[] }) {
    const data = await this.menuService.remove(ids);
    return ResultData.success(data);
  }
}
