import {Injectable} from '@angular/core';
import {TabService} from "@core/services/common/tab.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WindowService} from "@core/services/common/window.service";
import {AuthKey} from "@config/constant";
import {SimpleReuseStrategy} from "@core/services/common/reuse-strategy";
import {fnFormatePath} from "@utils/tools";

/*
* 退出登录
* */

@Injectable({
  providedIn: 'root'
})
export class LoginOutService {

  constructor(private activatedRoute: ActivatedRoute, private tabService: TabService, private router: Router, private windowServe: WindowService) {
  }

  loginOut(): Promise<void> {
    return new Promise(resolve => {
      this.tabService.clearTabs();
      this.windowServe.removeStorage(AuthKey);
      SimpleReuseStrategy.handlers = {};
      SimpleReuseStrategy.scrollHandlers = {};
      // @ts-ignore
      SimpleReuseStrategy.waitDelete = fnFormatePath(this.activatedRoute.snapshot['_routerState'].url);
      this.router.navigate(['/login/login-form']).then(()=>{
        resolve();
      })
    })

  }
}
