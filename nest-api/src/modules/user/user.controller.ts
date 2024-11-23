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
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { ResultData } from '../../common/result/result';
import { TableSearchFilterDto } from '../../common/tableSearchDto';
import { UpdateRoleDto } from '../role/dto/update-role.dto';
import { JwtGuard } from '../../guards/jwt.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { Permission } from '../../decorators/permission.decorator';

@ApiTags('用户管理') // 规整到user的swagger tag中
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '创建用户' })
  @Post('create')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:account:add')
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.create(createUserDto);
    return ResultData.success(data);
  }

  @Post('list')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:account')
  async findAll(@Body() searchParam: TableSearchFilterDto<CreateUserDto>) {
    const data = await this.userService.findAll(searchParam);
    return ResultData.success(data);
  }

  @Get(':id')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:account')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.findOne(id);
    return ResultData.success(data);
  }

  @Put('update')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:account:edit')
  async update(@Body() updateRoleDto: UpdateRoleDto) {
    const data = await this.userService.update(updateRoleDto);
    return ResultData.success(data);
  }

  @Post('del')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:account:del')
  async remove(@Body() { ids }: { ids: number[] }) {
    const data = await this.userService.remove(ids);
    return ResultData.success(data);
  }

  @Put('psd')
  @UseGuards(JwtGuard, AuthGuard)
  @Permission('default:system:account:edit')
  async changePsd(
    @Body() userPsd: { id: number; newPassword: string; oldPassword: string },
  ) {
    await this.userService.changePsd(userPsd);
    return ResultData.success(null);
  }

  @Get('auth-code/:id')
  async findOneAuthCode(@Param('id', ParseIntPipe) id: number) {
    const data = await this.userService.findOneAuthCode(id);
    return ResultData.success(data);
  }
}
