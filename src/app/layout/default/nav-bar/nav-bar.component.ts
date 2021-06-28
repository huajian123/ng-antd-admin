import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {filter, map, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TabService} from '../../../core/services/common/tab.service';
import {ThemeService} from '../../../core/services/store/theme.service';
import { Subject, Subscription} from 'rxjs';
import * as _ from 'lodash';
import {menuNav} from '../../../configs/menu';
import {Title} from '@angular/platform-browser';

interface Menu {
  path?: string;
  title: string;
  icon?: string;
  open?: boolean;
  selected?: boolean;
  children?: Menu[];
  actionCode?: string;
}

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit, OnDestroy {
  private destory$ = new Subject<void>();
  menus: Menu[] = menuNav;
  routerPath = '';
  themesOptions$ = this.themesService.getThemesMode();
  themesMode = 'side';
  isCollapsed$ = this.themesService.getIsCollapsed();
  isOverMode$ = this.themesService.getIsOverMode();
  isOverMode = false;
  isCollapsed = false;
  subs: Array<Subscription> = [];
  copyMenus: Menu[] = _.cloneDeep(this.menus);

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private tabService: TabService,
              private cdr: ChangeDetectorRef, private themesService: ThemeService,
              private titleServe: Title,) {
    this.routerPath = this.router.url;
    this.subs[0] = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destory$),
        tap(() => {
          // todo
          // @ts-ignore
          this.routerPath = this.activatedRoute.snapshot['_routerState'].url;
          this.clickMenuItem(this.menus);
          this.clickMenuItem(this.copyMenus);
          // 是折叠的菜单并且不是over菜单
          if (this.isCollapsed && !this.isOverMode) {
            this.closeMenuOpen(this.menus);
          } else {
            // this.menus = this.copyMenus;
          }

          if (this.themesMode === 'top' && !this.isOverMode) {
            this.closeMenu();
          }
        }),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => {
          return route.outlet === 'primary';
        }),
        mergeMap((route) => {
          return route.data;
        }),
      )
      .subscribe((routeData) => {
        this.tabService.addTab({
          title: routeData['title'],
          path: this.routerPath,
          relatedLink: routeData['relatedLink'] ? routeData['relatedLink'] : []
        });
        this.tabService.findIndex(this.routerPath);
        this.titleServe.setTitle(routeData['title']+' - ng antd admin')
      });
  }

  clickMenuItem(menus: Menu[]): void {
    if (!menus) {
      return;
    }
    const index = this.routerPath.indexOf('?') === -1 ? this.routerPath.length : this.routerPath.indexOf('?');
    const routePath = this.routerPath.substring(0, index);
    for (const item of menus) {
      item.open = false;
      item.selected = false;
      // 一级菜单
      if (!item.children || item.children.length === 0) {
        // if (item.path === routePath) {
        if (routePath.includes(item.path!)) {
          item.selected = true;
        }
        continue;
      }
      // 二级菜单
      for (const subItem of item.children) {
        subItem.selected = false;
        subItem.open = false;
        if (!subItem.children || subItem.children?.length === 0) {
          // if (subItem.path === routePath) {
          if (routePath.includes(subItem.path!)) {
            item.open = true;
            item.selected = true;
            subItem.selected = true;
            subItem.open = true;
          }
          continue;
        }
        for (const thirdItem of subItem.children) {
          // if (thirdItem.path === routePath) {
          if (routePath.includes(thirdItem.path!)) {
            item.open = true;
            item.selected = true;
            subItem.selected = true;
            subItem.open = true;
            thirdItem.open = true;
            thirdItem.selected = true;
          } else {
            thirdItem.open = false;
            thirdItem.selected = false;
          }
        }
      }
    }
    this.cdr.markForCheck();
  }

  // 改变当前菜单展示状态
  changeOpen(currentMenu: Menu, allMenu: Menu[]): void {
    allMenu.forEach((item) => {
      item.open = false;
    });
    currentMenu.open = true;
  }

  closeMenuOpen(menus: Menu[]): void {
    menus.forEach(menu => {
      menu.open = false;
      if (menu.children && menu.children.length > 0) {
        this.closeMenuOpen(menu.children);
      } else {
        return;
      }
    });
  }

  // 监听折叠菜单事件
  subIsCollapsed(): void {
    this.isCollapsed$.subscribe(isCollapsed => {
      this.isCollapsed = isCollapsed;
      // 菜单展开
      if (!this.isCollapsed) {
        this.menus = _.cloneDeep(this.copyMenus);
        this.clickMenuItem(this.menus);
      } else { // 菜单收起
        this.copyMenus = _.cloneDeep(this.menus);
        this.closeMenuOpen(this.menus);
      }
      this.cdr.markForCheck();
    });
  }

  closeMenu(): void {
    this.clickMenuItem(this.menus);
    this.clickMenuItem(this.copyMenus);
    this.closeMenuOpen(this.menus);
  }

  subThemesSettings(): void {
    this.isOverMode$.pipe(switchMap(res => {
      this.isOverMode = res;
      return this.themesOptions$;
    })).subscribe(options => {
      this.themesMode = options.mode;
      if (this.themesMode === 'top' && !this.isOverMode) {
        this.closeMenu();
      }
    });
  }


  ngOnInit(): void {
    this.subIsCollapsed();
    this.subThemesSettings();
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }
}
