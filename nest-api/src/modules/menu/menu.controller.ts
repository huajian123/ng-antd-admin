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
import { MenuService } from './menu.service';
import { TableSearchFilterDto } from '../../common/tableSearchDto';
import { CreateMenuDto } from './dto/create-menu.dto';
import { ResultData } from '../../common/result/result';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtGuard } from '../../guards/jwt.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { Permission } from '../../decorators/permission.decorator';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('create')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:menu:add')
  async create(@Body() createMenuDto: CreateMenuDto) {
    const data = await this.menuService.create(createMenuDto);
    return ResultData.success(data);
  }

  @Post('list')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:menu')
  async findAll(@Body() searchParam: TableSearchFilterDto<CreateMenuDto>) {
    const data = await this.menuService.findAll(searchParam, 'desc');
    return ResultData.success(data);
  }

  @Get(':id')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:menu')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.menuService.findOne(id);
    return ResultData.success(data);
  }

  @Put('update')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:menu:edit')
  async update(@Body() updateMenuDto: UpdateMenuDto) {
    const data = await this.menuService.update(updateMenuDto);
    return ResultData.success(data);
  }

  @Post('del')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:menu:del')
  async remove(@Body() { ids }: { ids: number[] }) {
    const data = await this.menuService.remove(ids);
    return ResultData.success(data);
  }
}
