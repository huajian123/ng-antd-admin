import {RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';

// 参考https://zhuanlan.zhihu.com/p/29823560
// tslint:disable-next-line:max-line-length
// https://blog.csdn.net/weixin_30561425/article/details/96985967?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control
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
  store(route: ActivatedRouteSnapshot, handle: any): void {
    if (SimpleReuseStrategy.waitDelete === route.data.key) {
      // 如果待删除是当前路由则不存储快照
      SimpleReuseStrategy.waitDelete = null;
      return;
    }
    SimpleReuseStrategy.handlers[route.data.key] = handle;

    if (handle && handle.componentRef) {
      this.runHook('_onReuseDestroy', handle.componentRef);
    }
  }

  //  是否允许还原路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const ret = !!route.data.key && !!SimpleReuseStrategy.handlers[route.data.key];
    if (ret) {
      this.runHook('_onReuseInit', SimpleReuseStrategy.handlers[route.data.key].componentRef);
    }
    return ret;
  }


  // 获取存储路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    return !route.data.key ? null : SimpleReuseStrategy.handlers[route.data.key];
  }

  // 进入路由触发，是否同一路由时复用路由
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.data.key === curr.data.key;
  }

  runHook(method: ReuseHookTypes, comp: ReuseComponentRef): void {
    const compThis = comp.instance;
    if (comp == null || !compThis) {
      return;
    }
    const fn = compThis[method];
    if (typeof fn !== 'function') {
      return;
    }
    console.log(method);
    if (method === '_onReuseInit') {
      (fn as () => void).call(compThis);
    } else {
      (fn as () => void).call(compThis);
    }
  }

  private hasInValidRoute(route: ActivatedRouteSnapshot): boolean {
    return !route.routeConfig || !!route.routeConfig.loadChildren || !!route.routeConfig.children;
  }

}

export type ReuseHookTypes = '_onReuseInit' | '_onReuseDestroy';

export interface ReuseComponentInstance {
  _onReuseInit: () => void;
  _onReuseDestroy: () => void;
  destroy: () => void;
}
export interface ReuseComponentRef {
  instance: ReuseComponentInstance;
}
