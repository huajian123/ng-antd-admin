import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Input, Inject} from '@angular/core';
import {filter, map, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TabService} from '../../../core/services/common/tab.service';
import {ThemeService} from '../../../core/services/store/theme.service';
import {Subject} from 'rxjs';
import * as _ from 'lodash';
import {Title} from '@angular/platform-browser';
import {SplitNavStoreService} from '../../../core/services/store/split-nav-store/split-nav-store.service';
import {menuNav} from "../../../config/menu";
import {Menu} from "../../../core/services/types";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit, OnDestroy {
  // 是混合模式顶部导航
  @Input() isMixiHead = false;
  @Input() isMixiLeft = false;
  private destory$ = new Subject<void>();
  menus: Menu[] = menuNav;
  routerPath = '';
  themesOptions$ = this.themesService.getThemesMode();
  themesMode = 'side';
  isNightTheme$ = this.themesService.getIsNightTheme();
  isCollapsed$ = this.themesService.getIsCollapsed();
  isOverMode$ = this.themesService.getIsOverMode();
  leftMenuArray$ = this.splitNavStoreService.getSplitLeftNavArrayStore();
  isOverMode = false;
  isCollapsed = false;
  isMixiMode = false;
  copyMenus: Menu[] = _.cloneDeep(this.menus);

  constructor(private router: Router, private splitNavStoreService: SplitNavStoreService,
              private activatedRoute: ActivatedRoute, private tabService: TabService,
              private cdr: ChangeDetectorRef, private themesService: ThemeService,
              private titleServe: Title, @Inject(DOCUMENT) private doc: Document) {
    this.routerPath = this.router.url;
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destory$),
        tap(() => {
          // @ts-ignore
          this.routerPath = this.activatedRoute.snapshot['_routerState'].url;
          this.clickMenuItem(this.menus);
          this.clickMenuItem(this.copyMenus);
          // 是折叠的菜单并且不是over菜单
          if (this.isCollapsed && !this.isOverMode) {
            this.closeMenuOpen(this.menus);
          }

          // 顶部菜单模式，并且不是over模式
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
        this.titleServe.setTitle(routeData['title'] + ' - Ant Design');

        // 混合模式时，切换tab，让左侧菜单也相应变化
        this.menus.forEach(item => {
          if (item.selected) {
            this.splitNavStoreService.setSplitLeftNavArrayStore(item.children!);
          }
        });
      });
  }

  // 混合模式点击一级菜单
  changTopNav(index: number): void {
    // 当前选中的第一级菜单对象
    const currentTopNav = this.menus[index];
    if (currentTopNav.children && currentTopNav.children.length > 0) {
      // 当前左侧导航数组
      const currentLeftNavArray = currentTopNav.children;
      if (!currentLeftNavArray[0].children) {
        this.router.navigateByUrl(currentLeftNavArray[0].path!);
        this.splitNavStoreService.setSplitLeftNavArrayStore(currentLeftNavArray);
      } else {
        this.router.navigateByUrl(currentLeftNavArray[0].children[0].path!);
        this.splitNavStoreService.setSplitLeftNavArrayStore(currentLeftNavArray);
      }
    }
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
        if (routePath.includes(item.path!) && !item.isNewLink) {
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
          if (routePath.includes(subItem.path!) && !item.isNewLink) {
            item.open = true;
            item.selected = true;
            subItem.selected = true;
            subItem.open = true;
          }
          continue;
        }
        for (const thirdItem of subItem.children) {
          // if (thirdItem.path === routePath) {
          if (routePath.includes(thirdItem.path!) && !item.isNewLink) {
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

  changeRoute(menu: Menu): void {
    if (menu.isNewLink) {
      this.menus = _.cloneDeep(this.copyMenus);
      if (this.themesMode === 'top' && !this.isOverMode) {
        this.closeMenu();
      }
      this.doc.body.click();
      window.open(menu.path, '_blank');
      return;
    }
    this.router.navigate([menu.path]);

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
      this.isMixiMode = this.themesMode === 'mixi';
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
