import {RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

// 参考https://zhuanlan.zhihu.com/p/29823560

export class SimpleReuseStrategy implements RouteReuseStrategy {

  static handlers: { [key: string]: any } = {};
  public static waitDelete: string | null;

  public static deleteRouteSnapshot(path: string): void {
    if (SimpleReuseStrategy.handlers[path]) {
      SimpleReuseStrategy.handlers[path].componentRef.destroy();
      delete SimpleReuseStrategy.handlers[path];
    }
  }

  // 是否允许复用路由
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data.shouldDetach !== 'no';
  }

  // 当路由离开时会触发，存储路由
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (SimpleReuseStrategy.waitDelete === route.data.key) {
      // 如果待删除是当前路由则不存储快照
      SimpleReuseStrategy.waitDelete = null;
      return;
    }
    SimpleReuseStrategy.handlers[route.data.key] = handle;
  }

  //  是否允许还原路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.data.key && !!SimpleReuseStrategy.handlers[route.data.key];
  }


  // 获取存储路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return !route.data.key ? null : SimpleReuseStrategy.handlers[route.data.key];
  }

  // 进入路由触发，是否同一路由时复用路由
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.data.key === curr.data.key;
  }

}
