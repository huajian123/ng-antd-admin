import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { DestroyService } from '@core/services/common/destory.service';
import { TabModel, TabService } from '@core/services/common/tab.service';
import { Menu } from '@core/services/types';
import { SplitNavStoreService } from '@store/common-store/split-nav-store.service';
import { ThemeService } from '@store/common-store/theme.service';
import { fnStopMouseEvent } from '@utils/tools';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzContextMenuService, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class TabComponent implements OnInit {
  tabsSourceData: TabModel[] = [];
  tabsSourceData$ = this.tabService.getTabArray$();
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  leftMenuArray$: Observable<Menu[]> = this.splitNavStoreService.getSplitLeftNavArrayStore();
  isOverMode$ = this.themesService.getIsOverMode();
  isOverMode = false;
  isCollapsed$ = this.themesService.getIsCollapsed();
  isCollapsed = false;

  constructor(
    public tabService: TabService,
    private nzContextMenuService: NzContextMenuService,
    private splitNavStoreService: SplitNavStoreService,
    private themesService: ThemeService,
    private destroy$: DestroyService,
    public router: Router,
    public cdr: ChangeDetectorRef
  ) {
    this.router.events.pipe(filter((event: NzSafeAny) => event instanceof NavigationEnd)).subscribe((event: NzSafeAny) => {
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
    this.tabService.delOtharTab(tab.path, index);
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
    this.tabsSourceData$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.tabsSourceData = res;
    });
  }
}
