import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { ResultData } from '../../common/result/result';
import { TableSearchFilterDto } from '../../common/tableSearchDto';

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
    console.log(id);
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
