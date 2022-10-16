import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router, UrlSegment } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { getDeepReuseStrategyKeyFn, fnGetPathWithoutParam } from '@utils/tools';
import _ from 'lodash';

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
  private tabArray$ = new BehaviorSubject<TabModel[]>([]);
  private tabArray: TabModel[] = [];
  private currSelectedIndexTab = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  getTabArray$(): Observable<TabModel[]> {
    return this.tabArray$.asObservable();
  }

  setTabArray$(tabArray: TabModel[]): void {
    this.tabArray$.next(tabArray);
  }

  setTabsSourceData(): void {
    this.setTabArray$(this.tabArray);
  }

  clearTabs(): void {
    this.tabArray = [];
    this.setTabsSourceData();
  }

  addTab(param: TabModel, isNewTabDetailPage = false): void {
    this.tabArray.forEach(tab => {
      // 列表详情操作，例如用户表单点击详情，在当前tab中打开这个详情，可以看在线示例：“查询表格”与表格中的“查看按钮”
      // title需和用户表单详情组件路由的title相同
      if (tab.title === param.title && !isNewTabDetailPage) {
        // 将每个tab下的组件快照存入tab数组中，下面做了去重操作
        tab.snapshotArray = _.uniqBy([...tab.snapshotArray, ...param.snapshotArray], item => {
          // @ts-ignore
          return item['_routerState'].url;
        });
        // 当前页中打开详情时，需要将对应的tab的path替换掉
        tab.path = param.path;
      }
    });
    if (!this.tabArray.find(value => value.path === param.path)) {
      this.tabArray.push(param);
    }
    this.setTabsSourceData();
  }

  getTabArray(): TabModel[] {
    return this.tabArray;
  }

  changeTabTitle(title: string): void {
    this.tabArray[this.getCurrentTabIndex()].title = title;
    this.setTabArray$(this.tabArray);
  }

  // 通过key来删除路由复用中SimpleReuseStrategy.handlers这个里面的缓存
  delReuseStrategy(snapshotArray: ActivatedRouteSnapshot[]): void {
    const beDeleteKeysArray = this.getSnapshotArrayKey(snapshotArray);
    // beDeleteKey数组保存相关路由的key，解决“在当前tab打开详情页时”，而产生"在哪个页面（列表页还是列表的详情页）上点击关闭按钮,被点击的页面（列表或者列表中的详情页，其中一个）的状态才会被清除，另一个不被清除"的bug
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
    // 获取待删除的tab
    const beDelTabArray = this.tabArray.filter((item, tabindex) => {
      return tabindex > index;
    });
    // 移除右键选中的tab右边的所有tab
    this.tabArray.length = index + 1;
    beDelTabArray.forEach(({ snapshotArray }) => {
      this.delReuseStrategy(snapshotArray);
    });
    // 如果鼠标右键选中的tab索引小于当前展示的tab的索引，就要连同正在打开的tab也要被删除
    if (index < this.currSelectedIndexTab) {
      SimpleReuseStrategy.waitDelete = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
      this.router.navigateByUrl(this.tabArray[index].path);
    }
    this.setTabsSourceData();
  }

  // 右键移除左边所有tab
  /*
   * @params index 当前鼠标点击右键所在的tab索引
   * */
  delLeftTab(tabPath: string, index: number): void {
    // 要删除的tab
    const beDelTabArray = this.tabArray.filter((item, tabindex) => {
      return tabindex < index;
    });

    // 先处理索引关系
    if (this.currSelectedIndexTab === index) {
      this.currSelectedIndexTab = 0;
    } else if (this.currSelectedIndexTab < index) {
      // 如果鼠标点击的tab索引大于当前索引，需要将当前页的path放到waitDelete中
      SimpleReuseStrategy.waitDelete = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
      this.currSelectedIndexTab = 0;
    } else if (this.currSelectedIndexTab > index) {
      this.currSelectedIndexTab = this.currSelectedIndexTab - beDelTabArray.length;
    }
    // 剩余的tab
    this.tabArray = this.tabArray.splice(beDelTabArray.length);
    beDelTabArray.forEach(({ snapshotArray }) => {
      this.delReuseStrategy(snapshotArray);
    });
    this.setTabsSourceData();
    this.router.navigateByUrl(this.tabArray[this.currSelectedIndexTab].path);
  }

  // 右键tab选择“移除其他tab”
  delOtharTab(path: string, index: number): void {
    // 要删除的tab
    const beDelTabArray = this.tabArray.filter((item, tabindex) => {
      return tabindex !== index;
    });

    // 处理应当展示的tab
    this.tabArray = [this.tabArray[index]];
    // 移除要删除的tab的缓存
    beDelTabArray.forEach(({ snapshotArray }) => {
      this.delReuseStrategy(snapshotArray);
    });

    // 如果鼠标选中的tab的索引，不是当前打开的页面的tab的索引，则要将当前页面的key作为waitDelete防止这个当前tab展示的组件移除后仍然被缓存
    if (index !== this.currSelectedIndexTab) {
      SimpleReuseStrategy.waitDelete = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
    }
    this.router.navigateByUrl(path);
    this.setTabsSourceData();
  }

  // 点击tab标签上x图标删除tab的动作,或者右键 点击“删除当前tab”动作
  delTab(tab: TabModel, index: number): void {
    // 移除当前正在展示的tab
    if (index === this.currSelectedIndexTab) {
      const seletedTabKey = getDeepReuseStrategyKeyFn(this.activatedRoute.snapshot);
      this.tabArray.splice(index, 1);
      // 处理索引关系
      this.currSelectedIndexTab = index - 1 < 0 ? 0 : index - 1;
      // 跳转到新tab
      this.router.navigateByUrl(this.tabArray[this.currSelectedIndexTab].path);
      // 在reuse-strategy.ts中缓存当前的path，如果是当前的path则不缓存当前路由
      SimpleReuseStrategy.waitDelete = seletedTabKey;
    } else if (index < this.currSelectedIndexTab) {
      // 如果鼠标选中的tab索引小于当前展示的tab索引，也就是鼠标选中的tab在当前tab的左侧
      this.tabArray.splice(index, 1);
      this.currSelectedIndexTab = this.currSelectedIndexTab - 1;
    } else if (index > this.currSelectedIndexTab) {
      // 移除当前页签右边的页签
      this.tabArray.splice(index, 1);
    }
    // 此操作为了解决例如列表页中有详情页，列表页和详情页两个页面的状态保存问题，解决了只能移除
    // 当前页面关闭的tab中状态的bug
    // 删除选中的tab所缓存的快照
    this.delReuseStrategy(tab.snapshotArray);
    this.setTabsSourceData();
  }

  findIndex(path: string): number {
    const current = this.tabArray.findIndex(tabItem => {
      return path === tabItem.path;
    });
    this.currSelectedIndexTab = current;
    return current;
  }

  getCurrentPathWithoutParam(urlSegmentArray: UrlSegment[], queryParam: { [key: string]: any }): string {
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
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        SimpleReuseStrategy.deleteRouteSnapshot(key);
        this.router.navigate([urlWithOutParam, ...Object.values(params)]);
      });
    } else {
      // 是query传参的路由,或者是没有参数的路由
      params = snapshot.queryParams;
      const sourceUrl = this.router.url;
      const currentRoute = fnGetPathWithoutParam(sourceUrl);
      // 是query传参
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        SimpleReuseStrategy.deleteRouteSnapshot(key);
        this.router.navigate([currentRoute], { queryParams: params });
      });
    }
  }

  getCurrentTabIndex(): number {
    return this.currSelectedIndexTab;
  }
}
