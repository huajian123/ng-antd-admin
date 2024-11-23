import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnum } from '../../enum/config.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // jwt -> sign ->payload校
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ConfigEnum.SECRET),
    });
  }

  // 在jwt策略下，passport首先验证jwt的签名并解码json,然后调用validate方法，该方法将解码后的json作为其单个参数传递。根据jwt签名的工作方式，我们可以保证接收到之前已经签名并发送给有效用户的有效token令牌
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
