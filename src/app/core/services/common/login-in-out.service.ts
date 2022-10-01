
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ActionCode } from '@config/actionCode';
import { TokenKey, TokenPre } from '@config/constant';
import { SimpleReuseStrategy } from '@core/services/common/reuse-strategy';
import { TabService } from '@core/services/common/tab.service';
import { WindowService } from '@core/services/common/window.service';
import { Menu } from '@core/services/types';
import { LoginService } from '@services/login/login.service';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { UserInfo, UserInfoService } from '@store/common-store/userInfo.service';
import { fnFormatePath } from '@utils/tools';
import { fnFlatDataHasParentToTree } from '@utils/treeTableTools';

/*
 * 退出登录
 * */

@Injectable({
  providedIn: 'root'
})
export class LoginInOutService {
  constructor(
    private activatedRoute: ActivatedRoute,
    private tabService: TabService,
    private loginService: LoginService,
    private router: Router,
    private userInfoService: UserInfoService,
    private menuService: MenuStoreService,
    private windowServe: WindowService
  ) {}

  getMenuByUserId(userId: string): Observable<Menu[]> {
    return this.loginService.getMenuByUserId(userId);
  }

  loginIn(token: string): Promise<void> {
    return new Promise(resolve => {
      // 将 token 持久化缓存，请注意，如果没有缓存，则会在路由首位中被拦截，不让路由跳转
      // 这个路由守卫src/app/core/services/common/guard/judgLogin.guard.ts
      this.windowServe.setSessionStorage(TokenKey, TokenPre + token);
      // 解析token ，然后获取用户信息
      const userInfo: UserInfo = this.userInfoService.parsToken(TokenPre + token);
      // todo  这里是手动添加静态页面标签页操作中，打开详情的按钮的权限，实际操作中可以删除下面2行
      userInfo.authCode.push(ActionCode.TabsDetail);
      userInfo.authCode.push(ActionCode.SearchTableDetail);
      // 将用户信息缓存到全局service中
      this.userInfoService.setUserInfo(userInfo);
      // 通过用户id来获取这个用户所拥有的menu
      this.getMenuByUserId(userInfo.userId)
        .pipe(
          finalize(() => {
            resolve();
          })
        )
        .subscribe(menus => {
          menus = menus.filter(item => {
            item.selected = false;
            item.open = false;
            return item.menuType === 'C';
          });
          const temp = fnFlatDataHasParentToTree(menus);
          // 存储menu
          this.menuService.setMenuArrayStore(temp);
          resolve();
        });
    });
  }

  loginOut(): Promise<void> {
    return new Promise(resolve => {
      // 清空tab
      this.tabService.clearTabs();
      this.windowServe.removeSessionStorage(TokenKey);
      SimpleReuseStrategy.handlers = {};
      SimpleReuseStrategy.scrollHandlers = {};
      this.menuService.setMenuArrayStore([]);
      // @ts-ignore
      SimpleReuseStrategy.waitDelete = fnFormatePath(this.activatedRoute.snapshot['_routerState'].url);
      this.router.navigate(['/login/login-form']).then(() => {
        resolve();
      });
    });
  }
}
