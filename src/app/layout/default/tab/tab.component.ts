import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {TabModel, TabService} from '../../../core/services/tab.service';
import {NzContextMenuService, NzDropdownMenuComponent} from 'ng-zorro-antd/dropdown';
import {ThemeService} from '../../../core/services/theme.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabComponent implements OnInit {

  tabs = this.tabService.getTabArray();
  themesOptions$ = this.themesService.getThemesMode();

  constructor(public tabService: TabService, private nzContextMenuService: NzContextMenuService,
              private themesService: ThemeService) {
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
  closeTab(tab: TabModel, e: MouseEvent, index: number): void {
    this.stopMounseEvent(e);
    if (1 === this.tabs.length) {
      return;
    }
    this.tabService.delTab(tab.path, index);
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  ngOnInit(): void {
  }

}
