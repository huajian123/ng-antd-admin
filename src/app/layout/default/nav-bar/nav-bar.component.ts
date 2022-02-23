import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy, Input, Inject} from '@angular/core';
import {filter, map, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ThemeService} from '@core/services/store/theme.service';
import {Title} from '@angular/platform-browser';
import {SplitNavStoreService} from '@core/services/store/split-nav-store/split-nav-store.service';
import {Menu} from "@core/services/types";
import {DOCUMENT} from "@angular/common";
import {MENU_TOKEN} from "@config/menu";
import {AuthService} from "@core/services/store/auth.service";
import {TabService} from "@core/services/common/tab.service";
import {DestroyService} from "@core/services/common/destory.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class NavBarComponent implements OnInit {
  // 是混合模式顶部导航
  @Input() isMixiHead = false;
  @Input() isMixiLeft = false;
  routerPath = this.router.url;
  themesOptions$ = this.themesService.getThemesMode();
  themesMode = 'side';
  isNightTheme$ = this.themesService.getIsNightTheme();
  isCollapsed$ = this.themesService.getIsCollapsed();
  isOverMode$ = this.themesService.getIsOverMode();
  leftMenuArray$ = this.splitNavStoreService.getSplitLeftNavArrayStore();
  isOverMode = false;
  isCollapsed = false;
  isMixiMode = false;
  copyMenus: Menu[] = this.cloneMenuArray(this.menus);
  authCodeArray: string[] = [];

  constructor(private router: Router,
              private destroy$: DestroyService,
              private authService: AuthService,
              @Inject(MENU_TOKEN) public menus: Menu[],
              private splitNavStoreService: SplitNavStoreService,
              private activatedRoute: ActivatedRoute, private tabService: TabService,
              private cdr: ChangeDetectorRef, private themesService: ThemeService,
              private titleServe: Title, @Inject(DOCUMENT) private doc: Document) {
    this.subIsCollapsed();
    this.subThemesSettings();
    this.subAuth();
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
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
        this.setMixModeLeftMenu();
      });
  }

  // 设置混合模式时，左侧菜单"自动分割菜单"模式的数据源
  setMixModeLeftMenu(): void {
    this.menus.forEach(item => {
      if (item.selected) {
        this.splitNavStoreService.setSplitLeftNavArrayStore(item.children!);
      }
    });
  }


  // 深拷贝克隆菜单数组
  cloneMenuArray(sourceMenuArray: Menu[], target: Menu[] = []): Menu[] {
    sourceMenuArray.forEach(item => {
      const obj: Menu = {title: ""};
      for (let i in item) {
        if (item.hasOwnProperty(i)) {
          // @ts-ignore
          if (Array.isArray(item[i])) {
            // @ts-ignore
            obj[i] = this.cloneMenuArray(item[i]);
          } else {
            // @ts-ignore
            obj[i] = item[i];
          }
        }
      }
      target.push({...obj});
    })
    return target;
  }


  // 混合模式点击一级菜单
  changTopNav(index: number): void {
    // 当前选中的第一级菜单对象
    const currentTopNav = this.menus[index];
    if (currentTopNav.children && currentTopNav.children.length > 0) {
      // 当前左侧导航数组
      /*添加了权限版*/
      let currentLeftNavArray = currentTopNav.children;
      currentLeftNavArray = currentLeftNavArray.filter(item => {
        return this.authCodeArray.includes(item.actionCode!);
      });
      if (currentLeftNavArray.length > 0 && !currentLeftNavArray[0].children) {
        this.router.navigateByUrl(currentLeftNavArray[0].path!);
      } else if (currentLeftNavArray.length > 0 && currentLeftNavArray[0].children) {
        this.router.navigateByUrl(currentLeftNavArray[0].children[0].path!);
      }
      this.splitNavStoreService.setSplitLeftNavArrayStore(currentLeftNavArray);
      /*添加了权限版结束*/
      // const currentLeftNavArray = currentTopNav.children;
      // if (!currentLeftNavArray[0].children) {
      //   this.router.navigateByUrl(currentLeftNavArray[0].path!);
      //   this.splitNavStoreService.setSplitLeftNavArrayStore(currentLeftNavArray);
      // } else {
      //   this.router.navigateByUrl(currentLeftNavArray[0].children[0].path!);
      //   this.splitNavStoreService.setSplitLeftNavArrayStore(currentLeftNavArray);
      // }
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
          if (routePath.includes(subItem.path!)) {
            item.open = true;
            item.selected = true;
            subItem.selected = true;
            subItem.open = true;
          }
          continue;
        }
        for (const thirdItem of subItem.children) {
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

  changeRoute(menu: Menu): void {
    if (menu.isNewLink) {
      this.menus = this.cloneMenuArray(this.copyMenus);
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
        this.menus = this.cloneMenuArray(this.copyMenus);
        this.clickMenuItem(this.menus);
      } else { // 菜单收起
        this.copyMenus = this.cloneMenuArray(this.menus);
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

  subAuth(): void {
    this.authService.getAuthCode().pipe(takeUntil(this.destroy$)).subscribe(res => this.authCodeArray = res);
  }

  subThemesSettings(): void {
    this.isOverMode$.pipe(switchMap(res => {
      this.isOverMode = res;
      return this.themesOptions$;
    })).subscribe(options => {
      this.themesMode = options.mode;
      this.isMixiMode = this.themesMode === 'mixi';
      // 顶部模式时要关闭menu的open状态
      if (this.themesMode === 'top' && !this.isOverMode) {
        this.closeMenu();
      } else {
        // 非top模式时，需要重新设置一下左侧mixi模式左侧菜单数据源
        // 不然会出现在'top模式和自动分割菜单的混合模式互相切换，有二级菜单的左侧菜单不自动展开'的bug
        this.setMixModeLeftMenu();
      }
    });
  }

  ngOnInit(): void {
  }
}
