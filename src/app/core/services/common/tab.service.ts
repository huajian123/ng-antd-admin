import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { fnFormatePath, fnGetPathWithoutParam } from '@utils/tools';
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

  // 根据path，获取路由复用中缓存的key
  getPathKey(path: string): string {
    const tempPath = fnFormatePath(path);
    const pathParam = this.router.parseUrl(path).queryParams;
    let pathParamString = JSON.stringify(pathParam);
    return tempPath + pathParamString;
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
      const params = JSON.stringify(item.queryParams);
      // @ts-ignore  获取路由最后一个/后面的字符串
      const url = fnFormatePath(item['_routerState'].url);
      temp.push(url + params);
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
      // @ts-ignore
      SimpleReuseStrategy.waitDelete = this.getPathKey(this.activatedRoute['_routerState'].snapshot.url);
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
      SimpleReuseStrategy.waitDelete = this.getPathKey(this.tabArray[this.currSelectedIndexTab].path);
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
    for (let i = 0; i < this.tabArray.length; i++) {
      if (this.tabArray[i].path !== path) {
        this.tabArray.splice(i, 1);
        i--;
      }
    }

    // 获取当前鼠标选中的tab，所缓存的key
    const seletedTabKey = this.getPathKey(path);
    for (const key in SimpleReuseStrategy.handlers) {
      // 删除所有 其它 key的缓存
      if (key !== seletedTabKey) {
        SimpleReuseStrategy.deleteRouteSnapshot(key);
      }
    }
    // 如果鼠标选中的tab的索引，不是当前打开的页面的tab的索引，则要将当前页面的key作为waitDelete防止这个当前tab展示的组件移除后仍然被缓存
    if (index !== this.currSelectedIndexTab) {
      // @ts-ignore
      SimpleReuseStrategy.waitDelete = this.getPathKey(this.activatedRoute['_routerState'].snapshot.url);
    }
    this.router.navigateByUrl(path);
    this.setTabsSourceData();
  }

  // 点击tab标签上x图标删除tab的动作,或者右键 点击“删除当前tab”动作
  delTab(tab: TabModel, index: number): void {
    // 移除当前选中的tab
    if (index === this.currSelectedIndexTab) {
      const seletedTabKey = this.getPathKey(tab.path);
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

  // 刷新
  refresh(): void {
    const sourceUrl = this.router.url;
    // 获取没有参数的路由
    const currentRoute = fnGetPathWithoutParam(sourceUrl);
    // 获取路由参数
    const queryParams = this.router.parseUrl(sourceUrl).queryParams;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      SimpleReuseStrategy.deleteRouteSnapshot(this.getPathKey(sourceUrl));
      this.router.navigate([currentRoute], { queryParams });
    });
  }

  getCurrentTabIndex(): number {
    return this.currSelectedIndexTab;
  }
}
