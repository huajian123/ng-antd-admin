import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChildFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { LoginInOutService } from '@core/services/common/login-in-out.service';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { UserInfoStoreService } from '@store/common-store/userInfo-store.service';
import { fnGetUUID } from '@utils/tools';

import { NzMessageService } from 'ng-zorro-antd/message';

import { Menu } from '../../types';

// 有兴趣的可以看看class与fn的争议https://github.com/angular/angular/pull/47924
// 我这里提供了跟judgeLogin.guard.ts的不同写法，供大家参考,也可以去官网查找mapToCanActivate 这个api，
// 用于切换路由时判断该用户是否有权限进入该业务页面，如果没有权限则跳转到登录页

function findMenu(menu: Menu[], url: string): Menu | null {
  for (const item of menu) {
    if (url === item.path) return item;
    if (item.children && item.children.length > 0) {
      const found = findMenu(item.children, url);
      if (found) return found;
    }
  }
  return null;
}

function makeGetResult(authCodeArray: string[], router: Router, loginOutService: LoginInOutService, message: NzMessageService) {
  return (code: string): boolean | UrlTree => {
    if (authCodeArray.includes(code)) return true;
    message.error('您没有权限登录该模块');
    loginOutService.loginOut();
    return router.parseUrl('/login');
  };
}

export const JudgeAuthGuard: CanActivateChildFn = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const getResult = makeGetResult(inject(UserInfoStoreService).$userInfo().authCode, inject(Router), inject(LoginInOutService), inject(NzMessageService));
  const menuNavList = inject(MenuStoreService).$menuArray();

  while (childRoute.firstChild) {
    childRoute = childRoute.firstChild;
  }

  // 如果有authCode，则表示是页面上点击按钮跳转到新的路由，而不是菜单中的路由
  if (childRoute.data['authCode']) {
    return getResult(childRoute.data['authCode']);
  }

  // 如果是菜单上的按钮，则走下面
  const selMenu = findMenu(menuNavList, state.url);
  // 没找到菜单，直接回登录页
  if (!selMenu) {
    return getResult(fnGetUUID());
  }
  // 找到了菜单，但是菜单的权限码用户不拥有，则跳转到登录页
  return getResult(selMenu.code!);
};
