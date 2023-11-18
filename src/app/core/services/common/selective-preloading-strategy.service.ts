import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

/*
 * 模块预加载service，参考资料：https://dev.to/this-is-angular/optimize-your-angular-apps-user-experience-with-preloading-strategies-3ie7
 * */
@Injectable({
  providedIn: 'root'
})
export class SelectivePreloadingStrategyService implements PreloadingStrategy {
  preloadedModules: string[] = []; // 这个数组用于记录已经配置预加载的模块。可能有的需求会想要获取它。

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // 路由配置中配置留下的preload属性为true的模块，才会被预加载。一般在你能预测用户下一个跳转的页面时，可以配置这个页面预加载。例如登陆后的首页。
    if (route.data?.['preload'] && route.path != null) {
      this.preloadedModules.push(route.path);
      return load();
    } else {
      return of(null);
    }
  }
}
