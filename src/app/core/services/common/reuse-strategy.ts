import { DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';

import { ScrollService } from '@core/services/common/scroll.service';
import { fnGetReuseStrategyKeyFn } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

/*路由复用*/
// 参考https://zhuanlan.zhihu.com/p/29823560
// https://blog.csdn.net/weixin_30561425/article/details/96985967?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.control
export class SimpleReuseStrategy implements RouteReuseStrategy {
  // 缓存每个component的map
  static handlers: { [key: string]: NzSafeAny } = {};
  // 缓存每个页面的scroll位置,为啥不放在handlers里面呢,因为路由离开时路由复用导致以当前页为key为null了
  static scrollHandlers: { [key: string]: NzSafeAny } = {};

  // 这个参数的目的是，在当前页签中点击删除按钮，虽然页签关闭了，但是在路由离开的时候，还是会将已经关闭的页签的组件缓存，
  // 用这个参数来记录，是否需要缓存当前路由
  public static waitDelete: string | null;

  public static deleteRouteSnapshot(key: string): void {
    if (SimpleReuseStrategy.handlers[key]) {
      if (SimpleReuseStrategy.handlers[key].componentRef) {
        SimpleReuseStrategy.handlers[key].componentRef.destroy();
      }
      delete SimpleReuseStrategy.handlers[key];
      delete SimpleReuseStrategy.scrollHandlers[key];
    }
  }

  constructor(@Inject(DOCUMENT) private doc: Document, private scrollService: ScrollService) {}

  // 是否允许复用路由
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data['shouldDetach'] !== 'no';
  }

  // 当路由离开时会触发，存储路由
  store(route: ActivatedRouteSnapshot, handle: NzSafeAny): void {
    if (route.data['shouldDetach'] === 'no') {
      return;
    }
    const key = fnGetReuseStrategyKeyFn(route);
    // 如果待删除的是当前路由则不存储快照
    if (SimpleReuseStrategy.waitDelete === key) {
      this.runHook('_onReuseDestroy', handle.componentRef);
      handle.componentRef.destroy();
      SimpleReuseStrategy.waitDelete = null;
      delete SimpleReuseStrategy.scrollHandlers[key];
      return;
    }

    // 离开路由的时候缓存当前页面的scroll位置
    // 默认都需要keepScroll，如果不需要keepScroll才添加needKeepScroll:no属性
    const innerScrollContainer = [];
    if (route.data['needKeepScroll'] !== 'no') {
      const scrollContain = route.data['scrollContain'] ?? [];
      scrollContain.forEach((item: string) => {
        const el = this.doc.querySelector(item)!;
        if (el) {
          const postion = this.scrollService.getScrollPosition(el);
          innerScrollContainer.push({ [item]: postion });
        }
      });
      innerScrollContainer.push({ window: this.scrollService.getScrollPosition() });
    }

    SimpleReuseStrategy.scrollHandlers[key] = { scroll: innerScrollContainer };
    SimpleReuseStrategy.handlers[key] = handle;

    if (handle && handle.componentRef) {
      this.runHook('_onReuseDestroy', handle.componentRef);
    }
  }

  // 是否允许还原路由
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const key = fnGetReuseStrategyKeyFn(route);
    return !!key && !!SimpleReuseStrategy.handlers[key];
  }

  // 获取存储路由
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const key = fnGetReuseStrategyKeyFn(route);
    return !key ? null : SimpleReuseStrategy.handlers[key];
  }

  // 进入路由触发，是同一路由时复用路由
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const futureKey = fnGetReuseStrategyKeyFn(future);
    const currKey = fnGetReuseStrategyKeyFn(curr);
    if (!!futureKey && SimpleReuseStrategy.handlers[futureKey]) {
      this.runHook('_onReuseInit', SimpleReuseStrategy.handlers[futureKey].componentRef);
    }

    const result = futureKey === currKey;
    // 懒加载读取不到data，通过此方法下钻到最下一级路由
    while (future.firstChild) {
      future = future.firstChild;
    }
    // 重新获取是因为future在上面while循环中已经变了
    const scrollFutureKey = fnGetReuseStrategyKeyFn(future);
    if (!!scrollFutureKey && SimpleReuseStrategy.scrollHandlers[scrollFutureKey]) {
      SimpleReuseStrategy.scrollHandlers[scrollFutureKey].scroll.forEach((elOptionItem: { [key: string]: [number, number] }) => {
        Object.keys(elOptionItem).forEach(element => {
          setTimeout(() => {
            this.scrollService.scrollToPosition(this.doc.querySelector(element), elOptionItem[element]);
          }, 1);
        });
      });
    }
    return result;
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
    (fn as () => void).call(compThis);
  }
}

export type ReuseHookTypes = '_onReuseInit' | '_onReuseDestroy';

export interface ReuseComponentInstance {
  _onReuseInit: () => void;
  _onReuseDestroy: () => void;
}

export interface ReuseComponentRef {
  instance: ReuseComponentInstance;
}
