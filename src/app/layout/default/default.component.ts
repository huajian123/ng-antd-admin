import { NgIf, NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';

import { IsFirstLogin } from '@config/constant';
import { DriverService } from '@core/services/common/driver.service';
import { WindowService } from '@core/services/common/window.service';
import { LayoutHeadRightMenuComponent } from '@shared/biz-components/layout-components/layout-head-right-menu/layout-head-right-menu.component';
import { ThemeService } from '@store/common-store/theme.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { DefLayoutContentComponent } from './def-layout-content/def-layout-content.component';
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
  standalone: true,
  imports: [
    DefLayoutContentComponent,
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
    AsyncPipe
  ]
})
export class DefaultComponent implements OnInit, AfterViewInit {
  isCollapsed$ = this.themesService.getIsCollapsed();
  themeOptions$ = this.themesService.getThemesMode();
  isCollapsed = false;
  isOverMode = false; // 窗口变窄时，导航栏是否变成抽屉模式
  @ViewChild('navDrawer') navDrawer!: NavDrawerComponent;
  destroyRef = inject(DestroyRef);
  constructor(private themesService: ThemeService, private driverService: DriverService, private windowService: WindowService) {}

  changeCollapsed(): void {
    if (this.isOverMode) {
      this.navDrawer.showDraw();
      return;
    }
    this.isCollapsed = !this.isCollapsed;
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

  ngAfterViewInit(): void {
    if (this.windowService.getStorage(IsFirstLogin) === 'false') {
      return;
    }
    this.windowService.setStorage(IsFirstLogin, 'false');
    this.driverService.load();
  }

  ngOnInit(): void {
    this.subTheme();
  }
}
