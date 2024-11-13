import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { rowId } from 'drizzle-orm/sqlite-core/expressions';
import { DrizzleAsyncProvider } from '../drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { menuTable } from '../drizzle/schema';
import { inArray } from 'drizzle-orm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwt: JwtService,
    @Inject(DrizzleAsyncProvider) private conn: NodePgDatabase<typeof schema>,
  ) {}

  // 登录
  async signIn(userName: string, password: string) {
    const res = await this.userService.findOneByUserName(userName);
    if (res?.password !== password) {
      console.log('密码错误');
      throw new UnauthorizedException();
    }
    // 生成token
    return await this.jwt.signAsync(
      {
        userName: userName,
        roles: rowId,
        sub: res.id,
      },
      // 局部设置
      // {
      //   expiresIn: '1h',
      // },
    );
  }
  signup(userName: string, password: string) {}

  async getMenuByUserAuthCode(authCode: string[]) {
    const data = await this.conn
      .select()
      .from(menuTable)
      .where(inArray(menuTable.code, authCode));
    return data;
  }
}
