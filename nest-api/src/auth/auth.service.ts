import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwt: JwtService,
  ) {}

  // 登录
  async signIn(userName: string, password: string) {
    const res = await this.userService.findOneByUserName(userName);
    console.log(res);
    if (res?.password !== password) {
      console.log('密码错误');
      throw new UnauthorizedException();
    }
    // 生成token
    return await this.jwt.signAsync(
      {
        userName: userName,
        sub: res.id,
      },
      // 局部设置
      // {
      //   expiresIn: '1h',
      // },
    );
  }
  signup(userName: string, password: string) {}
}
