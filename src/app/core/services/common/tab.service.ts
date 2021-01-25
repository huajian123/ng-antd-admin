import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SimpleReuseStrategy} from './reuse-strategy';


export interface TabModel {
  title: string;
  path: string;
  relatedLink: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private tabArray: TabModel[];
  private currSelectedIndexTab = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.tabArray = [];
  }

  addTab(param: TabModel): void {
    this.tabArray.forEach(tab => {
      // 路由的子菜单，例如用户表单路由的title需和用户表单详情组件路由的title相同
      if (tab.title === param.title) {
        tab.path = param.path;
      }
    });

    if (!this.tabArray.find((value) => value.path === param.path)) {
      this.tabArray.push(param);
    }
  }

  getTabArray(): TabModel[] {
    return this.tabArray;
  }

  // 右键移除右边所有tab
  // 右键移除tab
  delRightTab(tabPath: string, index: number): void {
    const temp = this.tabArray.filter((item, tabindex) => {
      return tabindex > index;
    });
    // 移除右键选中右边的tab
    this.tabArray.length = index + 1;
    temp.forEach(({path, relatedLink}) => {
      // relatedLink数组保存相关路由，解决路由中有详情页这样跳转路由，而产生"在哪个页面上关闭状态才会清除"的bug
      const linkArray = [...relatedLink, this.formatePath(path)];
      linkArray.forEach(item => {
        SimpleReuseStrategy.deleteRouteSnapshot(item);
      });
    });
    if (index < this.currSelectedIndexTab) {
      // todo
      // @ts-ignore
      SimpleReuseStrategy.waitDelete = this.formatePath(this.activatedRoute['_routerState'].snapshot.url);
      this.router.navigateByUrl(this.tabArray[index].path);
    }
  }

  // 右键移除其他tab
  delOtharTab(path: string, index: number): void {
    for (let i = 0; i < this.tabArray.length; i++) {
      if (this.tabArray[i].path !== path) {
        this.tabArray.splice(i, 1);
        i--;
      }
    }
    const tempPath = this.formatePath(path);
    for (const i in SimpleReuseStrategy.handlers) {
      if (i !== tempPath) {
        SimpleReuseStrategy.deleteRouteSnapshot(i);
      }
    }
    if (index !== this.currSelectedIndexTab) {
      // todo
      // @ts-ignore
      SimpleReuseStrategy.waitDelete = this.formatePath(this.activatedRoute['_routerState'].snapshot.url);
    }
    this.router.navigateByUrl(path);
  }

  // 点击tab标签上x图标删除tab的动作,右键删除当前tab动作
  delTab(tab: TabModel, index: number): void {
    const tempPath = this.formatePath(tab.path);
    // 移除当前选中的tab
    if (index === this.currSelectedIndexTab) {
      this.tabArray.splice(index, 1);
      this.currSelectedIndexTab = index - 1 < 0 ? 0 : index - 1;
      this.router.navigateByUrl(this.tabArray[this.currSelectedIndexTab].path);
      // 在reuse-strategy.ts中缓存当前的path，如果是当前的path则不缓存当前路由
      SimpleReuseStrategy.waitDelete = tempPath;
    } else if (index < this.currSelectedIndexTab) {
      this.tabArray.splice(index, 1);
      this.currSelectedIndexTab = this.currSelectedIndexTab - 1;
    } else if (index > this.currSelectedIndexTab) {
      // 移除当前页签右边的页签
      this.tabArray.splice(index, 1);
    }
    // 此操作为了解决例如列表页中有详情页，列表页和详情页两个页面的状态保存问题，解决了只能移除
    // 当前页面关闭的tab中状态的bug
    const beDeltabArray = [...tab.relatedLink, tempPath];
    beDeltabArray.forEach(item => SimpleReuseStrategy.deleteRouteSnapshot(item));
  }

  findIndex(path: string): number {
    const current = this.tabArray.findIndex((tabItem) => {
      return path.includes(tabItem.path);
    });
    this.currSelectedIndexTab = current;
    return current;
  }

  getCurrentTabIndex(): number {
    return this.currSelectedIndexTab;
  }

  formatePath(path: string): string {
    const newpath = path.replace(/\/[0-9]+/g, '');
    return newpath.substring(newpath.lastIndexOf('\/') + 1);
  }

}
