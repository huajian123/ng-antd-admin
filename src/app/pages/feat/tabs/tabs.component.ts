import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { TabService } from '@core/services/common/tab.service';
import { PageHeaderType } from '@shared/components/page-header/page-header.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '标签页操作示例，如果需要在当前tab页面展示详情，请在"列表页>查询表格"中点击表格查看按钮，演示效果',
    breadcrumb: ['首页', '扩展功能', '标签页面操作示例']
  };
  routerPath = this.router.url;

  constructor(private router: Router, private tabService: TabService, private cdr: ChangeDetectorRef) {}

  changeTabTitle(title: string): void {
    this.tabService.changeTabTitle(title);
  }

  closeRight(): void {
    this.tabService.delRightTab(this.router.url, this.tabService.getCurrentTabIndex());
  }
  closeLeft(): void {
    this.tabService.delLeftTab(this.router.url, this.tabService.getCurrentTabIndex());
  }

  closeOther(): void {
    this.tabService.delOtherTab(this.router.url, this.tabService.getCurrentTabIndex());
  }

  closeCurrent(): void {
    const tabArray = this.tabService.getTabArray();
    this.tabService.delTab(tabArray[this.tabService.getCurrentTabIndex()], this.tabService.getCurrentTabIndex());
  }

  openDetailPage(i: number): void {
    this.router.navigate(['default/feat/tabs/example-detail'], { queryParams: { id: i } });
  }

  refresh(): void {
    this.tabService.refresh();
  }

  ngOnInit(): void {}
}
