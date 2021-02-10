import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {filter, map, mergeMap, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TabService} from '../../../core/services/common/tab.service';
import {ThemeService} from '../../../core/services/store/theme.service';
import { Subject, Subscription} from 'rxjs';
import * as _ from 'lodash';
import {ActionCode} from '../../../configs/actionCode';

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
  styleUrls: ['./nav-bar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit, OnDestroy {
  private destory$ = new Subject<void>();
  menus: Menu[] = [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      open: false,
      selected: false,
      actionCode: ActionCode.Dashboard,
      children: [
        {
          title: '分析页',
          open: false,
          selected: false,
          path: '/default/dashboard/analysis',
        },
        {
          title: '监控页',
          open: false,
          selected: false,
          path: '/default/dashboard/monitor',
        },
        {
          title: '工作台',
          open: false,
          selected: false,
          path: '/default/dashboard/workbench',
        },
      ]
    },
    {
      title: '表单页',
      icon: 'form',
      open: false,
      selected: false,
      actionCode: ActionCode.FormModule,
      children: [
        {
          title: '基础表单',
          open: false,
          selected: false,
          path: '/default/form/base-form',
        },
        {
          title: '分布表单',
          open: false,
          selected: false,
          path: '/default/form/step-form',
        },
        {
          title: '高级表单',
          open: false,
          selected: false,
          path: '/default/form/advanced-form',
        },
      ]
    },
    {
      title: '列表页',
      icon: 'table',
      open: false,
      selected: false,
      actionCode: ActionCode.ListModule,
      children: [
        {
          title: '搜索列表',
          open: false,
          selected: false,
          path: '/list/search-list',
          children: [
            {
              title: '搜索列表(文章）',
              open: false,
              selected: false,
              path: '/list/search-list/acticle',
            },
            {
              title: '搜索列表(项目)',
              open: false,
              selected: false,
              path: '/list/search-list/project',
            },
            {
              title: '搜索列表(应用)',
              open: false,
              selected: false,
              path: '/list/search-list/app',
            },
          ]
        },
        {
          title: '查询表格',
          open: false,
          selected: false,
          path: '/search-table',
        },
        {
          title: '标准表格',
          open: false,
          selected: false,
          path: '/custom-table',
        },
        {
          title: '卡片列表',
          open: false,
          selected: false,
          path: '/card-table',
        },
      ]
    },
    {
      title: '详情页',
      icon: 'profile',
      open: false,
      selected: false,
      actionCode: ActionCode.DetailModule,
      children: [
        {
          title: '基础详情页',
          open: false,
          selected: false,
          path: '/detail-base',
        },
        {
          title: '高级详情页',
          open: false,
          selected: false,
          path: '/detail-adv',
        },
      ]
    },
    {
      title: '结果页',
      icon: 'check-circle',
      open: false,
      selected: false,
      actionCode: ActionCode.ResultModule,
      children: [
        {
          title: '成功页',
          open: false,
          selected: false,
          path: '/result/success',
        },
        {
          title: '失败页',
          open: false,
          selected: false,
          path: '/result/error',
        },
      ]
    },
    {
      title: '异常页',
      icon: 'warning',
      open: false,
      selected: false,
      actionCode: ActionCode.ErrorModule,
      children: [
        {
          title: '403',
          open: false,
          selected: false,
          path: '/error/403',
        },
        {
          title: '404',
          open: false,
          selected: false,
          path: '/error/404',
        },
        {
          title: '500',
          open: false,
          selected: false,
          path: '/error/500',
        },
      ]
    },
    {
      title: '个人页',
      icon: 'user',
      open: false,
      selected: false,
      actionCode: ActionCode.PersonalModule,
      children: [
        {
          title: '个人中心',
          open: false,
          selected: false,
          path: '/user-info',
        },
        {
          title: '个人设置',
          open: false,
          selected: false,
          path: '/user-setting',
        },
      ]
    },
    {
      title: '内部管理',
      icon: 'highlight',
      open: false,
      selected: false,
      actionCode: ActionCode.InternalModule,
      children: [
        {
          title: '用户管理',
          open: false,
          selected: false,
          path: '/default/internal-manage/user-manage',
          actionCode: ActionCode.UserManage,
        },
        {
          title: '角色管理',
          open: false,
          selected: false,
          path: '/default/internal-manage/role-manage',
          actionCode: ActionCode.Role,
        },
        {
          title: '部门管理',
          open: false,
          selected: false,
          path: '/default/internal-manage/dept-manage',
          actionCode: ActionCode.Dept,
        },
      ]
    },
  ];
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
              private cdr: ChangeDetectorRef, private themesService: ThemeService) {
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
