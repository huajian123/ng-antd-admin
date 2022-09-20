/* eslint-disable prettier/prettier */
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { fnFormatePath, fnGetPathWithoutParam } from '@utils/tools';

import { SimpleReuseStrategy } from './reuse-strategy';

export interface TabModel {
  title: string;
  path: string;
  relatedLink: string[];
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
      // 路由的子菜单，例如用户表单路由的title需和用户表单详情组件路由的title相同
      if (tab.title === param.title && !isNewTabDetailPage) {
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

  // 右键移除右边所有tab
  delRightTab(tabPath: string, index: number): void {
    const temp = this.tabArray.filter((item, tabindex) => {
      return tabindex > index;
    });
    // 移除右键选中右边的tab
    this.tabArray.length = index + 1;
    temp.forEach(({ path, relatedLink }) => {
      // relatedLink数组保存相关路由，解决路由中有详情页这样跳转路由，而产生"在哪个页面上点击关闭按钮,保存的状态才会清除"的bug
      const linkArray = [...relatedLink, this.getPathKey(path)];
      linkArray.forEach(item => {
        SimpleReuseStrategy.deleteRouteSnapshot(item);
      });
    });
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
    const temp = this.tabArray.filter((item, tabindex) => {
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
      this.currSelectedIndexTab = this.currSelectedIndexTab - temp.length;
    }
    // 剩余的tab
    this.tabArray = this.tabArray.splice(temp.length);
    temp.forEach(({ path, relatedLink }) => {
      // relatedLink数组保存相关路由，解决路由中有详情页这样跳转路由，而产生"在哪个页面上点击关闭按钮,保存的状态才会清除"的bug
      const linkArray = [...relatedLink, this.getPathKey(path)];
      linkArray.forEach(item => {
        SimpleReuseStrategy.deleteRouteSnapshot(item);
      });
    });
    this.setTabsSourceData();
    this.router.navigateByUrl(this.tabArray[this.currSelectedIndexTab].path);
  }

  // 右键移除其他tab
  delOtharTab(path: string, index: number): void {
    for (let i = 0; i < this.tabArray.length; i++) {
      if (this.tabArray[i].path !== path) {
        this.tabArray.splice(i, 1);
        i--;
      }
    }
    const tempPath = fnFormatePath(path);
    for (const i in SimpleReuseStrategy.handlers) {
      if (i !== tempPath) {
        SimpleReuseStrategy.deleteRouteSnapshot(i);
      }
    }
    if (index !== this.currSelectedIndexTab) {
      // @ts-ignore
      SimpleReuseStrategy.waitDelete = fnFormatePath(this.activatedRoute['_routerState'].snapshot.url);
    }
    this.router.navigateByUrl(path);
    this.setTabsSourceData();
  }

  getPathKey(path: string): string {
    const tempPath = fnFormatePath(path);
    const pathParam = this.router.parseUrl(path).queryParams;
    let pathParamString = '';
    if (Object.keys(pathParam).length > 0) {
      pathParamString = JSON.stringify(this.router.parseUrl(path).queryParams);
    }
    return tempPath + pathParamString;
  }

  // 点击tab标签上x图标删除tab的动作,右键删除当前tab动作
  delTab(tab: TabModel, index: number): void {
    const pathKey = this.getPathKey(tab.path);
    // 移除当前选中的tab
    if (index === this.currSelectedIndexTab) {
      this.tabArray.splice(index, 1);
      this.currSelectedIndexTab = index - 1 < 0 ? 0 : index - 1;
      this.router.navigateByUrl(this.tabArray[this.currSelectedIndexTab].path);
      // 在reuse-strategy.ts中缓存当前的path，如果是当前的path则不缓存当前路由
      SimpleReuseStrategy.waitDelete = pathKey;
    } else if (index < this.currSelectedIndexTab) {
      this.tabArray.splice(index, 1);
      this.currSelectedIndexTab = this.currSelectedIndexTab - 1;
    } else if (index > this.currSelectedIndexTab) {
      // 移除当前页签右边的页签
      this.tabArray.splice(index, 1);
    }
    // 此操作为了解决例如列表页中有详情页，列表页和详情页两个页面的状态保存问题，解决了只能移除
    // 当前页面关闭的tab中状态的bug
    const beDeltabArray = [...tab.relatedLink, pathKey];
    beDeltabArray.forEach(item => SimpleReuseStrategy.deleteRouteSnapshot(item));
    this.setTabsSourceData();
  }

  findIndex(path: string): number {
    const current = this.tabArray.findIndex(tabItem => {
      return path === tabItem.path;
    });
    this.currSelectedIndexTab = current;
    return current;
  }

  refresh(): void {
    const sourceUrl = this.router.url;
    // 只有当前页签会刷新，如果涉及到tab页内的详情的页面不会刷新
    const currentRoute = fnGetPathWithoutParam(sourceUrl);
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
