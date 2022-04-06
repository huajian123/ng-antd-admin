import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {TabModel, TabService} from '@core/services/common/tab.service';
import {NzContextMenuService, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {SettingInterface, ThemeService} from '@core/services/store/theme.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';
import {fnStopMouseEvent} from '@utils/tools';
import {NzSafeAny} from "ng-zorro-antd/core/types";
import {DestroyService} from "@core/services/common/destory.service";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class TabComponent implements OnInit {
  tabs = this.tabService.getTabArray();
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();
  themeOptinons: SettingInterface = {
    color: "",
    colorWeak: false,
    fixedHead: false,
    fixedLeftNav: false,
    fixedTab: false,
    fixedWidth: false,
    hasFooterArea: false,
    hasNavArea: false,
    hasNavHeadArea: false,
    hasTopArea: false,
    mode: 'side',
    splitNav: false,
    theme: 'dark'
  };
  top = "48px";
  left = `208px`;
  isOverMode$ = this.themesService.getIsOverMode();
  isOverMode = false;
  isCollapsed$ = this.themesService.getIsCollapsed();
  isCollapsed = false;

  constructor(public tabService: TabService, private nzContextMenuService: NzContextMenuService,
              private themesService: ThemeService,
              private destroy$: DestroyService,
              private router: Router, public cdr: ChangeDetectorRef) {
    (this.router.events.pipe(filter((event: NzSafeAny) => event instanceof NavigationEnd))).subscribe((event: NzSafeAny) => {
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
    this.closeCurrentTab(this.tabs[indexObj.index], indexObj.index);
  }

  // 关闭当前Tab
  closeCurrentTab(tab: TabModel, index: number): void {
    if (1 === this.tabs.length) {
      return;
    }
    this.tabService.delTab(tab, index);
  }

  refresh(): void {
    const currentRoute = this.router.url;
    this.router.navigateByUrl("/", {skipLocationChange: true}).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  ngOnInit(): void {
    this.themesOptions$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.themeOptinons = res;
      this.top = !this.themeOptinons.hasTopArea ? "0px" : '48px';
      if (this.themeOptinons.hasNavArea) {
        this.left = '208px';
        if (this.isCollapsed) {
          this.left = '48px';
        }
      } else {
        this.left = '0px';
      }
    });


    this.isOverMode$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.isOverMode = res;
      if (this.isCollapsed) {
        this.left = '0px';
      }
    });
    this.isCollapsed$.pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.isCollapsed = res
      if (this.isCollapsed) {
        this.left = '48px';
      }
    });


  }
}
