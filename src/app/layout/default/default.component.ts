import { NgTemplateOutlet, AsyncPipe, NgClass, NgStyle, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import { fadeRouteAnimation } from '@app/animations/fade.animation';
import { SettingDrawerComponent, Theme } from '@app/layout/default/setting-drawer/setting-drawer.component';
import { CollapsedNavWidth, IsFirstLogin, SideNavWidth } from '@config/constant';
import { DriverService } from '@core/services/common/driver.service';
import { WindowService } from '@core/services/common/window.service';
import { Menu } from '@core/services/types';
import { LayoutHeadRightMenuComponent } from '@shared/biz-components/layout-components/layout-head-right-menu/layout-head-right-menu.component';
import { ChatComponent } from '@shared/components/chat/chat.component';
import { TopProgressBarComponent } from '@shared/components/top-progress-bar/top-progress-bar.component';
import { SplitNavStoreService } from '@store/common-store/split-nav-store.service';
import { SettingInterface, ThemeService } from '@store/common-store/theme.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TabComponent } from './tab/tab.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeRouteAnimation],
  standalone: true,
  imports: [
    TopProgressBarComponent,
    NzLayoutModule,
    NgClass,
    NzNoAnimationModule,
    NgStyle,
    SettingDrawerComponent,
    ChatComponent,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    AsyncPipe,
    SideNavComponent,
    NgTemplateOutlet,
    ToolBarComponent,
    NzIconModule,
    NzButtonModule,
    NavBarComponent,
    LayoutHeadRightMenuComponent,
    TabComponent,
    RouterOutlet,
    NavDrawerComponent,
    AsyncPipe,
    ChatComponent,
    NgOptimizedImage
  ]
})
export class DefaultComponent implements OnInit, AfterViewInit {
  @ViewChild('navDrawer') navDrawer!: NavDrawerComponent;
  SideNavWidth = SideNavWidth;
  CollapsedNavWidth = CollapsedNavWidth;

  destroyRef = inject(DestroyRef); // 用于销毁订阅
  windowService = inject(WindowService); // 用于获取window对象
  driverService = inject(DriverService); // 用于引导用户
  themesService = inject(ThemeService); // 用于获取主题
  splitNavStoreService = inject(SplitNavStoreService); // 用于获取分割菜单的store

  isNightTheme$ = this.themesService.getIsNightTheme();
  isCompactTheme$ = this.themesService.getIsCompactTheme();
  themesOptions$ = this.themesService.getThemesMode();
  styleThemeMode$ = this.themesService.getStyleThemeMode();
  isOverMode$: Observable<boolean> = this.themesService.getIsOverMode();
  isCollapsed$: Observable<boolean> = this.themesService.getIsCollapsed();
  mixinModeLeftNav$ = this.splitNavStoreService.getSplitLeftNavArrayStore();

  showChats = true; // 是否显示聊天窗口
  isMixinMode = false; // 是否是混合模式
  isNightTheme = false; // 是否是暗色主题
  isCompactTheme = false; // 是否是紧凑主题
  isFixedLeftNav = false; // 是否固定左侧菜单
  isSplitNav = false; // 是否分割菜单
  isCollapsed = false; // 是否折叠左侧菜单
  isOverMode = false; // 窗口变窄时，导航栏是否变成抽屉模式
  isShowTab = false; // 是否显示页签
  isFixedTab = false; // 是否固定页签
  isHasNavArea = false; // 是否有菜单区域
  isHasNavHeadArea = false; // 是否有菜单头部区域
  isHasFooterArea = false; // 是否有底部区域
  isHasTopArea = false; // 是否有顶部区域

  isFixedHead = false; // 是否固定头部
  isSideMode = false; // 是否是侧边模式
  isTopMode = false; // 是否是顶部模式
  theme: Theme['key'] = 'dark'; // 主题模式

  themesOptions!: SettingInterface;
  mixinModeLeftNav: Menu[] = []; // 混合模式下的左侧菜单
  contentMarginTop = '48px';

  changeCollapsed(isCollapsed: boolean): void {
    // 如果是over模式，点击左侧菜单，显示抽屉菜单
    if (this.isOverMode) {
      this.navDrawer.showDraw();
      return;
    }
    this.isCollapsed = isCollapsed;
    // 设置左侧菜单是否折叠的状态
    this.themesService.setIsCollapsed(this.isCollapsed);
  }

  // 路由动画
  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.['key'];
  }

  judgeMarginTop(): string {
    let marginTop;
    if (this.isFixedHead && !this.isMixinMode && this.isHasTopArea) {
      marginTop = this.isShowTab ? (this.isFixedTab ? 96 : 48) : 48;
    } else {
      marginTop = this.isShowTab ? (this.isFixedTab ? 48 : 0) : 0;
    }
    if (this.isCompactTheme) {
      marginTop = marginTop - 8;
    }
    return `${marginTop}px`;
  }

  getThemeOptions(): void {
    this.styleThemeMode$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      // 切换风格模式时也要重新计算margin，这个跟themesOptions$里貌似时重复的代码，考虑用combineLatest来进行合并的话，会有性能损失（切换风格时也会执行themeOptions里面的逻辑），所以这里分开来写了
      this.contentMarginTop = this.judgeMarginTop();
    });

    this.themesOptions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.themesOptions = res;

      const { fixedTab, fixedHead, hasFooterArea, mode, fixedLeftNav, hasNavArea, hasTopArea, hasNavHeadArea, isShowTab, splitNav, theme } = this.themesOptions;

      this.isMixinMode = mode === 'mixin';
      this.isSideMode = mode === 'side';
      this.isTopMode = mode === 'top';
      this.isFixedLeftNav = fixedLeftNav;
      this.isHasNavArea = hasNavArea;
      this.isHasTopArea = hasTopArea;
      this.isHasNavHeadArea = hasNavHeadArea;
      this.isShowTab = isShowTab;
      this.isSplitNav = splitNav;
      this.theme = theme;
      this.isFixedHead = fixedHead;
      this.isHasFooterArea = hasFooterArea;
      this.isFixedTab = fixedTab;

      this.contentMarginTop = this.judgeMarginTop();
    });

    this.isCollapsed$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => (this.isCollapsed = res));
    this.isOverMode$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => (this.isOverMode = res));
    this.isNightTheme$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => (this.isNightTheme = res));
    this.isCompactTheme$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => (this.isCompactTheme = res));
    this.mixinModeLeftNav$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => (this.mixinModeLeftNav = res));
  }

  ngAfterViewInit(): void {
    if (this.windowService.getStorage(IsFirstLogin) === 'false') {
      return;
    }
    this.windowService.setStorage(IsFirstLogin, 'false');
    this.driverService.load();
  }

  ngOnInit(): void {
    this.getThemeOptions();
  }
}
