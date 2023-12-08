import { NgClass, NgStyle, AsyncPipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

import { TabModel, TabService } from '@core/services/common/tab.service';
import { Menu } from '@core/services/types';
import { MouseHoverShowDirective } from '@shared/directives/mouse-hover-show.directive';
import { SplitNavStoreService } from '@store/common-store/split-nav-store.service';
import { ThemeService } from '@store/common-store/theme.service';
import { fnStopMouseEvent } from '@utils/tools';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzContextMenuService, NzDropdownMenuComponent, NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NzCardModule, NzTabsModule, NzDropDownModule, NzMenuModule, NzButtonModule, NgClass, NgStyle, MouseHoverShowDirective, NzIconModule, AsyncPipe]
})
export class TabComponent implements OnInit {
  private tabService = inject(TabService);
  private nzContextMenuService = inject(NzContextMenuService);
  private splitNavStoreService = inject(SplitNavStoreService);
  private themesService = inject(ThemeService);
  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  tabsSourceData: TabModel[] = [];
  tabsSourceData$ = this.tabService.getTabArray$();
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  leftMenuArray$: Observable<Menu[]> = this.splitNavStoreService.getSplitLeftNavArrayStore();
  isOverMode$ = this.themesService.getIsOverMode();
  isCollapsed$ = this.themesService.getIsCollapsed();
  destroyRef = inject(DestroyRef);

  constructor() {
    this.router.events
      .pipe(filter((event: NzSafeAny) => event instanceof NavigationEnd))
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  get currentIndex(): number {
    return this.tabService.getCurrentTabIndex();
  }

  public trackByTab(index: number, tab: TabModel): string {
    return tab.title;
  }

  // 点击tab跳转到对应的path
  goPage(tab: TabModel): void {
    this.router.navigateByUrl(tab.path);
  }

  // 右键点击关闭右侧tab
  closeRithTab(tab: TabModel, e: MouseEvent, index: number): void {
    fnStopMouseEvent(e);
    this.tabService.delRightTab(tab.path, index);
  }

  // 右键点击关闭左侧tab
  closeLeftTab(tab: TabModel, e: MouseEvent, index: number): void {
    if (index === 0) {
      return;
    }
    fnStopMouseEvent(e);
    this.tabService.delLeftTab(tab.path, index);
  }

  // 关闭其他tab
  closeOtherTab(tab: TabModel, e: MouseEvent, index: number): void {
    fnStopMouseEvent(e);
    this.tabService.delOtherTab(tab.path, index);
  }

  // 右键关闭当前Tab
  closeTab(tab: TabModel, e: MouseEvent, index: number): void {
    fnStopMouseEvent(e);
    this.closeCurrentTab(tab, index);
  }

  // 点击tab上的关闭icon
  clickCloseIcon(indexObj: { index: number }): void {
    this.closeCurrentTab(this.tabsSourceData[indexObj.index], indexObj.index);
  }

  // 关闭当前Tab
  closeCurrentTab(tab: TabModel, index: number): void {
    if (this.tabsSourceData.length === 1) {
      return;
    }
    this.tabService.delTab(tab, index);
    // ngZoneEventCoalescing，ngZoneRunCoalescing例子,请查看main.ts
    this.cdr.detectChanges();
  }

  refresh(): void {
    this.tabService.refresh();
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  ngOnInit(): void {
    this.tabsSourceData$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.tabsSourceData = res;
    });
  }
}
