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
    console.log(password);

    const res = await this.userService.findAll({ filters: { userName } });
    console.log(res.list[0].password === password);
    if (res.list[0].password === password) {
      console.log(res.list[0]);
      // 生成token
      return await this.jwt.signAsync(
        {
          userName: res.list[0].userName,
          id: res.list[0].id,
        },
        // 局部设置
        // {
        //   expiresIn: '1h',
        // },
      );
    }
    throw new UnauthorizedException();
  }
  signup(userName: string, password: string) {}
}
