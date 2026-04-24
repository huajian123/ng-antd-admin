import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef, booleanAttribute, input, computed, signal, effect, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

import { TabService } from '@core/services/common/tab.service';
import { Menu } from '@core/services/types';
import { AuthDirective } from '@shared/directives/auth.directive';
import { MenuStoreService } from '@store/common-store/menu-store.service';
import { SplitNavStoreService } from '@store/common-store/split-nav-store.service';
import { ThemeService } from '@store/common-store/theme.service';
import { UserInfoStoreService } from '@store/common-store/userInfo-store.service';
import { fnStopMouseEvent } from '@utils/tools';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/animation';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzMenuModule, NzNoAnimationDirective, NgTemplateOutlet, NzButtonModule, NzIconModule, RouterLink, AuthDirective, TranslateModule]
})
export class NavBarComponent implements OnInit {
  readonly isMixinHead = input(false, { transform: booleanAttribute }); // 是混合模式顶部导航
  readonly isMixinLeft = input(false, { transform: booleanAttribute });

  private router = inject(Router);
  private userInfoService = inject(UserInfoStoreService);
  private menuServices = inject(MenuStoreService);
  private splitNavStoreService = inject(SplitNavStoreService);
  private activatedRoute = inject(ActivatedRoute);
  private tabService = inject(TabService);
  private themesService = inject(ThemeService);
  private destroyRef = inject(DestroyRef);

  // Signals for state management
  routerPath = signal(this.router.url);
  menus = signal<Menu[]>([]);
  copyMenus = signal<Menu[]>([]);

  // Computed signals from services
  authCodeArray = computed(() => this.userInfoService.$userInfo().authCode);
  $isNightTheme = computed(() => this.themesService.$isNightTheme());

  // Direct access to service signals (they are already signals, not observables)
  themesOptions = this.themesService.$themesOptions;
  isCollapsed = this.themesService.$isCollapsed;
  isOverMode = this.themesService.$isOverModeTheme;
  // 混合模式下左侧菜单数据源
  leftMenuArray = this.splitNavStoreService.$splitLeftNavArray;

  // Computed signals for derived state
  themesMode = computed(() => this.themesOptions().mode);
  isMixinMode = computed(() => this.themesMode() === 'mixin');

  constructor() {
    this.initMenus();
    this.setupRouterListener();
    this.setupCollapseEffect();
    this.setupThemeEffect();
  }

  private initMenus(): void {
    // 1. 读取 $menuArray() —— 这是 effect 的唯一"触发源"，$menuArray 变化才会重新执行。
    // 2. untracked(() => this.clickMenuItem(menusArray))
    //    clickMenuItem 内部会读取 this.routerPath()（也是 signal）。
    //    如果不加 untracked，routerPath 变化也会触发这个 effect，导致菜单数据被意外重置。
    //    用 untracked 包裹，表示"我只是借用 routerPath 的值，但不订阅它的变化"。
    //
    // 3. untracked(() => this.cloneMenuArray(processed))
    //    cloneMenuArray 本身不读 signal，加 untracked 是防御性写法，确保 effect 依赖关系清晰。
    effect(() => {
      const menusArray = this.menuServices.$menuArray();
      const processed = untracked(() => this.clickMenuItem(menusArray));
      this.menus.set(processed);
      this.copyMenus.set(untracked(() => this.cloneMenuArray(processed)));
      // effect 是异步调度的，ngOnInit 里的 setMixModeLeftMenu() 执行时 menus 可能还是空数组。
      // 菜单数据就绪后，在混合模式下需要重新设置左侧菜单，否则刷新页面左侧菜单会消失。
      if (untracked(() => this.isMixinMode())) {
        untracked(() => this.setMixModeLeftMenu());
      }
    });
  }

  private setupRouterListener(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter((event: NavigationEnd) => event.url !== '/default/refresh-empty'),
        tap(() => {
          // @ts-ignore
          const url = this.activatedRoute.snapshot['_routerState'].url;
          this.routerPath.set(url);

          // 主题切换为混合模式下，设置左侧菜单数据源
          // 注意：故意在 menus.set() 之前调用，读取的是上一次路由留下的 selected 状态。
          // 混合模式下切换顶部一级菜单时，左侧菜单应跟随"当前已选中的一级菜单"，而非新路由。
          if (this.isMixinMode()) {
            this.setMixModeLeftMenu();
          }

          // 更新菜单状态
          //  做一个copyMenus来记录当前menu状态，因为顶部模式时是不展示子menu的，然而主题由顶部模式切换成侧边栏模式，要把当前顶部模式中菜单的状态体现于侧边栏模式的菜单中
          this.menus.set(this.clickMenuItem(this.menus()));
          this.copyMenus.set(this.clickMenuItem(this.copyMenus()));

          // 折叠菜单且不是over模式时，关闭菜单
          if (this.isCollapsed() && !this.isOverMode()) {
            this.menus.set(this.closeMenuOpen(this.menus()));
          }

          // 顶部菜单模式且不是over模式时，关闭菜单。解决顶部模式时，切换tab会有悬浮框菜单的bug
          if (this.themesMode() === 'top' && !this.isOverMode()) {
            this.closeAllMenuOpen();
          }
        }),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(routeData => {
        const isNewTabDetailPage = routeData['newTab'] === 'true';
        this.routeEndAction(isNewTabDetailPage);
      });
  }

  // 监听折叠菜单事件
  private setupCollapseEffect(): void {
    effect(() => {
      const collapsed = this.isCollapsed();

      if (!collapsed) {
        // 菜单展开
        const updated = untracked(() => this.clickMenuItem(this.cloneMenuArray(this.copyMenus())));
        this.menus.set(updated);

        // 混合模式下要在点击一下左侧菜单数据源，不然有二级菜单的菜单在折叠状态变为展开时不open
        if (untracked(() => this.themesMode()) === 'mixin') {
          const leftUpdated = untracked(() => this.clickMenuItem(this.leftMenuArray()));
          this.splitNavStoreService.$splitLeftNavArray.set(leftUpdated);
        }
      } else {
        // 菜单收起：保存当前展开状态到 copyMenus，供展开时恢复。
        // 注意：不调用 menus.set()，视觉折叠效果由 nzInlineCollapsed 驱动，
        // closeMenuOpen 只是同步内存里的 open 状态，防止展开时状态错乱。
        const copy = untracked(() => this.cloneMenuArray(this.menus()));
        this.copyMenus.set(this.closeMenuOpen(copy));
      }
    });
  }

  // Effect to handle theme mode changes
  private setupThemeEffect(): void {
    effect(() => {
      const mode = this.themesMode();
      const overMode = untracked(() => this.isOverMode());

      if (mode === 'top' && !overMode) {
        untracked(() => this.closeMenu());
      }
    });
  }

  // 设置混合模式时，左侧菜单"自动分割菜单"模式的数据源
  setMixModeLeftMenu(): void {
    const menus = this.menus();
    menus.forEach(item => {
      if (item.selected) {
        this.splitNavStoreService.$splitLeftNavArray.set(item.children || []);
      }
    });
  }

  // 深拷贝克隆菜单数组
  cloneMenuArray(sourceMenuArray: Menu[], target: Menu[] = []): Menu[] {
    sourceMenuArray.forEach(item => {
      const obj: Menu = { menuName: '', menuType: 'C', path: '', id: -1, fatherId: -1, code: '' };
      for (const i in item) {
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
      target.push({ ...obj });
    });
    return target;
  }

  // 混合模式点击一级菜单，要让一级菜单下的第一个子菜单被选中
  changTopNav(index: number): void {
    // 当前选中的第一级菜单对象
    const currentTopNav = this.menus()[index];
    let currentLeftNavArray = currentTopNav.children || [];
    // 如果一级菜单下有二级菜单
    if (currentLeftNavArray.length > 0) {
      // 当前左侧导航数组
      /*添加了权限版*/
      // 获取有权限的二级菜单集合（在左侧展示的）
      currentLeftNavArray = currentLeftNavArray.filter(item => {
        return this.authCodeArray().includes(item.code!);
      });
      // 如果第一个二级菜单，没有三级菜单
      if (currentLeftNavArray.length > 0 && !currentLeftNavArray[0].children) {
        this.router.navigateByUrl(currentLeftNavArray[0].path!);
      } else if (currentLeftNavArray.length > 0 && currentLeftNavArray[0].children) {
        // 如果有三级菜单，则跳转到第一个三级菜单
        this.router.navigateByUrl(currentLeftNavArray[0].children[0].path!);
      }
    }
    this.splitNavStoreService.$splitLeftNavArray.set(currentLeftNavArray);
  }

  // flatMenu 必须是纯函数（返回新数组），不能直接 mutate 传入的 menus。
  // 原因：此方法在 effect() 内部被调用（通过 clickMenuItem），如果直接修改 signal 内部的对象，
  // Angular 会检测到变化并重新触发 effect，导致无限循环白屏。
  flatMenu(menus: Menu[], routePath: string): Menu[] {
    return menus.map(item => {
      const isActive = routePath.includes(item.path) && !item.newLinkFlag;
      const hasChildren = item.children && item.children.length > 0;

      return {
        ...item,
        selected: isActive,
        open: isActive,
        children: hasChildren ? this.flatMenu(item.children!, routePath) : item.children
      };
    });
  }

  clickMenuItem(menus: Menu[]): Menu[] {
    if (!menus) {
      return menus;
    }
    const routerPath = this.routerPath();
    const index = routerPath.indexOf('?') === -1 ? routerPath.length : routerPath.indexOf('?');
    const routePath = routerPath.substring(0, index);
    return this.flatMenu(menus, routePath);
  }

  // 改变当前菜单展示状态
  changeOpen(currentMenu: Menu, allMenu: Menu[]): void {
    allMenu.forEach(item => {
      item.open = false;
    });
    currentMenu.open = true;
  }

  // 同 flatMenu，必须是纯函数，不能直接 mutate，原因相同。
  closeMenuOpen(menus: Menu[]): Menu[] {
    return menus.map(menu => ({
      ...menu,
      open: false,
      children: menu.children && menu.children.length > 0
        ? this.closeMenuOpen(menu.children)
        : menu.children
    }));
  }

  changeRoute(e: MouseEvent, menu: Menu): void {
    if (menu.newLinkFlag) {
      fnStopMouseEvent(e);
      window.open(menu.path, '_blank');
      return;
    }
    this.router.navigate([menu.path]);
  }

  // 只负责关闭所有展开项，不更新选中状态
  private closeAllMenuOpen(): void {
    this.menus.set(this.closeMenuOpen(this.menus()));
  }

  closeMenu(): void {
    // 先用 clickMenuItem 更新菜单选中状态，再用 closeMenuOpen 关闭所有展开项
    const menusWithSelection = this.clickMenuItem(this.menus());
    this.menus.set(this.closeMenuOpen(menusWithSelection));
    this.copyMenus.set(this.clickMenuItem(this.copyMenus()));
  }

  routeEndAction(isNewTabDetailPage = false): void {
    let route = this.activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }

    let title = 'Ant Design';
    if (typeof route.routeConfig?.title === 'string') {
      title = route.routeConfig?.title;
    }

    this.tabService.addTab(
      {
        snapshotArray: [route.snapshot],
        title,
        path: this.routerPath()
      },
      isNewTabDetailPage
    );
    this.tabService.findIndex(this.routerPath());
    // 混合模式时，切换tab，让左侧菜单也相应变化
    this.setMixModeLeftMenu();
  }

  ngOnInit(): void {
    this.routeEndAction();
  }
}
