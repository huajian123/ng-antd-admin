import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigEnum } from '../enum/config.enum';
import { reflector } from '../constants/reflector.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authCode: string[] =
      (await this.cacheManager.get(ConfigEnum.AUTH_CODE)) || [];
    const requiredPermission = reflector.get<string>(
      'permission',
      context.getHandler(),
    );
    if (!requiredPermission) {
      // 如果没有定义权限码，则默认允许访问
      return true;
    }
    const hasPermission = authCode.includes(requiredPermission);
    if (!hasPermission) {
      throw new ForbiddenException('Insufficient permissions');
    }

    return true;
  }
}
