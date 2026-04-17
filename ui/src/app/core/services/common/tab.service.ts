import { inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router, UrlSegment } from '@angular/router';

import { getDeepReuseStrategyKeyFn, fnGetPathWithoutParam } from '@utils/tools';
import _ from 'lodash';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { SimpleReuseStrategy } from './reuse-strategy';

export interface TabModel {
  title: string;
  path: string;
  snapshotArray: ActivatedRouteSnapshot[];
}

/*
 * tab操作的服务
 * */
@Injectable({
  providedIn: 'root'
})
export class TabService {
  $tabArray = signal<TabModel[]>([]);
  $currSelectedIndexTab = signal(0);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  clearTabs(): void {
    this.$tabArray.set([]);
  }

  addTab(tabModel: TabModel, isNewTabDetailPage = false): void {
    // 如果是刷新操作时的
    if (tabModel.title === 'refresh-empty') {
      return;
    }
    this.$tabArray.update(tabs => {
      tabs.forEach(tab => {
        if (tab.title === tabModel.title && !isNewTabDetailPage) {
          // 列表详情操作，例如用户表单点击详情，在当前tab中打开这个详情，可以看在线示例："查询表格"与表格中的"查看按钮"
          // title需和用户表单详情组件路由的title相同
          // 将每个tab下的组件快照存入tab数组中，下面做了去重操作
          tab.snapshotArray = _.uniqBy([...tab.snapshotArray, ...tabModel.snapshotArray], item => {
            // @ts-ignore
            return item['_routerState'].url;
          });
          // 当前页中打开详情时，需要将对应的tab的path替换掉
          tab.path = tabModel.path;
        }
      });
      if (!tabs.find(value => value.path === tabModel.path)) {
        return [...tabs, tabModel];
      }
      return [...tabs];
    });
  }

  getTabArray(): TabModel[] {
    return this.$tabArray();
  }

  changeTabTitle(title: string): void {
    this.$tabArray.update(tabs => {
      tabs[this.$currSelectedIndexTab()].title = title;
      return [...tabs];
    });
  }

  // 通过key来删除路由复用中SimpleReuseStrategy.handlers这个里面的缓存
  delReuseStrategy(snapshotArray: ActivatedRouteSnapshot[]): void {
    // beDeleteKey数组保存相关路由的key，解决"在当前tab打开详情页时"，而产生"在哪个页面（列表页还是列表的详情页）上点击关闭按钮,被点击的页面（列表或者列表中的详情页，其中一个）的状态才会被清除，另一个不被清除"的bug
    const beDeleteKeysArray = this.getSnapshotArrayKey(snapshotArray);
    beDeleteKeysArray.forEach(item => {
      SimpleReuseStrategy.deleteRouteSnapshot(item);
    });
  }

  // 根据tab中缓存的路由快照，构造路由复用的key 例如： login{name:'zhangsan'},这样key+param的形式是缓存在SimpleReuseStrategy.handlers中的
  getSnapshotArrayKey(activatedArray: ActivatedRouteSnapshot[]): string[] {
    const temp: string[] = [];
    activatedArray.forEach(item => {
      const key = getDeepReuseStrategyKeyFn(item);
      temp.push(key);
    });
    return temp;
  }

  // 右键tab移除右边所有tab，index为鼠标选中的tab索引
  delRightTab(tabPath: string, index: number): void {
    const tabs = this.$tabArray();
    // 获取待删除的tab
    const beDelTabArray = tabs.filter((_, tabindex) => tabindex > index);
    // 移除右键选中的tab右边的所有tab
    beDelTabArray.forEach(({ snapshotArray }) => {
      this.delReuseStrategy(snapshotArray);
    });
    this.$tabArray.set(tabs.slice(0, index + 1));
    // 如果鼠标右键选中的tab索引小于当前展示的tab的索引，就要连同正在打开的tab也要被删除
    if (index < this.$currSelectedIndexTab()) {
      SimpleReuseStrategy.waitDelete = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
      this.router.navigateByUrl(this.$tabArray()[index].path);
    }
  }

  // 右键移除左边所有tab
  /*
   * @params index 当前鼠标点击右键所在的tab索引
   * */
  delLeftTab(tabPath: string, index: number): void {
    const tabs = this.$tabArray();
    // 要删除的tab
    const beDelTabArray = tabs.filter((_, tabindex) => tabindex < index);

    // 先处理索引关系
    if (this.$currSelectedIndexTab() === index) {
      this.$currSelectedIndexTab.set(0);
    } else if (this.$currSelectedIndexTab() < index) {
      // 如果鼠标点击的tab索引大于当前索引，需要将当前页的path放到waitDelete中
      SimpleReuseStrategy.waitDelete = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
      this.$currSelectedIndexTab.set(0);
    } else if (this.$currSelectedIndexTab() > index) {
      this.$currSelectedIndexTab.set(this.$currSelectedIndexTab() - beDelTabArray.length);
    }

    beDelTabArray.forEach(({ snapshotArray }) => {
      this.delReuseStrategy(snapshotArray);
    });
    // 剩余的tab
    this.$tabArray.set(tabs.slice(beDelTabArray.length));
    this.router.navigateByUrl(this.$tabArray()[this.$currSelectedIndexTab()].path);
  }

  // 右键tab选择"移除其他tab"
  delOtherTab(path: string, index: number): void {
    const tabs = this.$tabArray();
    // 要删除的tab
    const beDelTabArray = tabs.filter((_, tabindex) => tabindex !== index);

    // 处理应当展示的tab
    // 移除要删除的tab的缓存
    beDelTabArray.forEach(({ snapshotArray }) => {
      this.delReuseStrategy(snapshotArray);
    });

    // 如果鼠标选中的tab的索引，不是当前打开的页面的tab的索引，则要将当前页面的key作为waitDelete防止这个当前tab展示的组件移除后仍然被缓存
    if (index !== this.$currSelectedIndexTab()) {
      SimpleReuseStrategy.waitDelete = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
    }
    // 必须先 set 再 navigateByUrl，因为路由变化会触发 nav-bar 的 setupRouterListener，
    // 里面会调用 findIndex()，此时 $tabArray 必须已经是最新状态。
    this.$tabArray.set([tabs[index]]);
    this.router.navigateByUrl(path);
  }

  // 点击tab标签上x图标删除tab的动作,或者右键 点击"删除当前tab"动作
  delTab(tab: TabModel, index: number): void {
    const tabs = this.$tabArray();
    const updated = [...tabs];
    updated.splice(index, 1);
    // 移除当前正在展示的tab
    if (index === this.$currSelectedIndexTab()) {
      const seletedTabKey = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
      this.$tabArray.set(updated);
      // 处理索引关系
      this.$currSelectedIndexTab.set(index - 1 < 0 ? 0 : index - 1);
      // 必须在 navigateByUrl 之前设置 waitDelete，否则路由离开时 store() 已执行，
      // waitDelete 还未赋值，被删除的路由组件会被缓存，导致下次进入时复用旧实例。
      SimpleReuseStrategy.waitDelete = seletedTabKey;
      // 跳转到新tab
      this.router.navigateByUrl(this.$tabArray()[this.$currSelectedIndexTab()].path);
    } else if (index < this.$currSelectedIndexTab()) {
      // 如果鼠标选中的tab索引小于当前展示的tab索引，也就是鼠标选中的tab在当前tab的左侧
      this.$tabArray.set(updated);
      this.$currSelectedIndexTab.set(this.$currSelectedIndexTab() - 1);
    } else if (index > this.$currSelectedIndexTab()) {
      // 移除当前页签右边的页签
      this.$tabArray.set(updated);
    }
    // 此操作为了解决例如列表页中有详情页，列表页和详情页两个页面的状态保存问题，解决了只能移除
    // 当前页面关闭的tab中状态的bug
    // 删除选中的tab所缓存的快照
    this.delReuseStrategy(tab.snapshotArray);
  }

  findIndex(path: string): number {
    const current = this.$tabArray().findIndex(tabItem => path === tabItem.path);
    this.$currSelectedIndexTab.set(current);
    return current;
  }

  getCurrentPathWithoutParam(urlSegmentArray: UrlSegment[], queryParam: Record<string, NzSafeAny>): string {
    const temp: string[] = [];
    // 获取所有参数的value
    const queryParamValuesArray = Object.values(queryParam);
    urlSegmentArray.forEach(urlSeqment => {
      // 把表示参数的url片段剔除
      if (!queryParamValuesArray.includes(urlSeqment.path)) {
        temp.push(urlSeqment.path);
      }
    });
    return `${temp.join('/')}`;
  }

  // 刷新
  refresh(): void {
    // 获取当前的路由快照
    let snapshot = this.activatedRoute.snapshot;
    const key = getDeepReuseStrategyKeyFn(snapshot);
    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
    }
    let params: Params;
    let urlWithOutParam = ''; // 这是没有参数的url
    // 是路径传参的路由，并且有参数
    if (Object.keys(snapshot.params).length > 0) {
      params = snapshot.params;
      // @ts-ignore
      urlWithOutParam = this.getCurrentPathWithoutParam(snapshot['_urlSegment'].segments, params);
      this.router.navigateByUrl('/default/refresh-empty', { skipLocationChange: true }).then(() => {
        SimpleReuseStrategy.deleteRouteSnapshot(key);
        this.router.navigate([urlWithOutParam, ...Object.values(params)]);
      });
    } else {
      // 是query传参的路由,或者是没有参数的路由
      params = snapshot.queryParams;
      const sourceUrl = this.router.url;
      const currentRoute = fnGetPathWithoutParam(sourceUrl);
      // 是query传参
      this.router.navigateByUrl('/default/refresh-empty', { skipLocationChange: true }).then(() => {
        SimpleReuseStrategy.deleteRouteSnapshot(key);
        this.router.navigate([currentRoute], { queryParams: params });
      });
    }
  }

  getCurrentTabIndex(): number {
    return this.$currSelectedIndexTab();
  }
}
