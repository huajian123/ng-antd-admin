import { NgIf, NgTemplateOutlet, AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import { fadeRouteAnimation } from '@app/animations/fade.animation';
import { SettingDrawerComponent } from '@app/layout/default/setting-drawer/setting-drawer.component';
import { IsFirstLogin } from '@config/constant';
import { DriverService } from '@core/services/common/driver.service';
import { WindowService } from '@core/services/common/window.service';
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
    NgIf,
    NgClass,
    NzNoAnimationModule,
    NgStyle,
    SettingDrawerComponent,
    ChatComponent,
    NzMenuModule,
    NzButtonModule,
    NzIconModule,
    AsyncPipe,
    NgIf,
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
    ChatComponent
  ]
})
export class DefaultComponent implements OnInit, AfterViewInit {
  showChats = true;
  isMixiMode = false;
  themesOptions: SettingInterface = {
    theme: 'dark',
    color: '',
    mode: 'side',
    splitNav: false,
    isShowTab: true,
    fixedTab: false,
    colorWeak: false,
    greyTheme: false,
    fixedHead: false,
    fixedLeftNav: false,
    hasTopArea: true,
    hasFooterArea: true,
    hasNavArea: true,
    hasNavHeadArea: true
  };
  isFixedLeftNav = false;
  isNightTheme$ = this.themesService.getIsNightTheme();
  themesOptions$ = this.themesService.getThemesMode();
  isOverMode$: Observable<boolean> = this.themesService.getIsOverMode();
  isCollapsed$: Observable<boolean> = this.themesService.getIsCollapsed();
  themeOptions$ = this.themesService.getThemesMode();
  isCollapsed = false;
  isOverMode = false; // 窗口变窄时，导航栏是否变成抽屉模式
  // 混合模式下，判断顶部菜单是否有子菜单，如果没有子菜单，要隐藏左侧菜单
  mixiModeLeftNav = this.splitNavStoreService.getSplitLeftNavArrayStore();
  contentMarginTop = '48px';
  @ViewChild('navDrawer') navDrawer!: NavDrawerComponent;
  destroyRef = inject(DestroyRef);
  constructor(private themesService: ThemeService, private splitNavStoreService: SplitNavStoreService, private driverService: DriverService, private windowService: WindowService) {}

  changeCollapsed(isCollapsed: boolean): void {
    if (this.isOverMode) {
      this.navDrawer.showDraw();
      return;
    }
    this.isCollapsed = isCollapsed;
    this.themesService.setIsCollapsed(this.isCollapsed);
  }

  // 监听各种流
  subTheme(): void {
    this.themesService
      .getIsCollapsed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => (this.isCollapsed = res));
    this.themesService
      .getIsOverMode()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => (this.isOverMode = res));
  }

  prepareRoute(outlet: RouterOutlet): string {
    return outlet?.activatedRouteData?.['key'];
  }

  getThemeOptions(): void {
    this.themesOptions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.themesOptions = res;
      this.isMixiMode = res.mode === 'mixi';
      this.isFixedLeftNav = this.themesOptions.fixedLeftNav;

      if (this.themesOptions.fixedHead && !this.isMixiMode && this.themesOptions.hasTopArea) {
        this.contentMarginTop = this.themesOptions.isShowTab ? (this.themesOptions.fixedTab ? '96px' : '48px') : '48px';
      } else {
        this.contentMarginTop = this.themesOptions.isShowTab ? (this.themesOptions.fixedTab ? '48px' : '0px') : '0px';
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.windowService.getStorage(IsFirstLogin) === 'false') {
      return;
    }
    this.windowService.setStorage(IsFirstLogin, 'false');
    this.driverService.load();
  }

  ngOnInit(): void {
    this.subTheme();
    this.getThemeOptions();
  }
}
