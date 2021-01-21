import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {TabModel, TabService} from '../../../core/services/common/tab.service';
import {NzContextMenuService, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {ThemeService} from '../../../core/services/store/theme.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {

  tabs = this.tabService.getTabArray();
  themesOptions$ = this.themesService.getThemesMode();
  isNightTheme$ = this.themesService.getIsNightTheme();

  constructor(public tabService: TabService, private nzContextMenuService: NzContextMenuService,
              private themesService: ThemeService,
              private router: Router, public cdr: ChangeDetectorRef,) {
  }

  get currentIndex(): number {
    return this.tabService.getCurrentTabIndex();
  }

  public trackByTab(index: number, tab: TabModel): string {
    return tab.title;
  }

  stopMounseEvent(e: MouseEvent): void {
    e.stopPropagation();
    e.preventDefault();
  }

  // 点击tab跳转到对应的path
  goPage(tab: TabModel): void {
    this.router.navigateByUrl(tab.path);
  }

  // 右键点击关闭右侧tab
  closeRithTab(tab: TabModel, e: MouseEvent, index: number): void {
    this.stopMounseEvent(e);
    this.tabService.delRightTab(tab.path, index);
  }

  // 关闭其他tab
  closeOtherTab(tab: TabModel, e: MouseEvent, index: number): void {
    this.stopMounseEvent(e);
    this.tabService.delOtharTab(tab.path, index);
  }

  // 关闭当前Tab
  closeCurrentTab(tab: TabModel, index: number): void {
    if (1 === this.tabs.length) {
      return;
    }
    this.tabService.delTab(tab.path, index);
  }

  // 关闭Tab
  closeTab(tab: TabModel, e: MouseEvent, index: number): void {
    this.stopMounseEvent(e);
    this.closeCurrentTab(tab, index);
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  // 点击tab上的关闭icon
  clickCloseIcon(indexObj: { index: number }): void {
    this.closeCurrentTab(this.tabs[indexObj.index], indexObj.index);
  }

  ngOnInit(): void {
  }

}
