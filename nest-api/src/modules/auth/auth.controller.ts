import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin-user.dto';
import { ResultData } from '../../common/result/result';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() dto: SigninUserDto) {
    const { userName, password } = dto;
    const token = await this.authService.signIn(userName, password);
    return ResultData.success(token);
  }

  @Post('signout')
  async signOut() {
    this.authService.signOut();
    return ResultData.success(null);
  }

  @Post('signup')
  signup(@Body() dto: SigninUserDto) {
    const { userName, password } = dto;
    return this.authService.signup(userName, password);
  }

  @Post('menu')
  async getMenuByUserAuthCode(@Body() dto: string[]) {
    const data = await this.authService.getMenuByUserAuthCode(dto);
    return ResultData.success(data);
  }
}
