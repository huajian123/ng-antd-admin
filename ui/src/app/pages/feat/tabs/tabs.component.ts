import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';

import { TabService } from '@core/services/common/tab.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSpaceCompactComponent } from 'ng-zorro-antd/space';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PageHeaderComponent, NzCardModule, NzButtonModule, NzInputModule, NzIconModule, NzSpaceCompactComponent]
})
export class TabsComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '标签页操作示例，如果需要在当前tab页面展示详情，请在"列表页>查询表格"中点击表格查看按钮，演示效果',
    breadcrumb: ['首页', '功能', '标签页操作'],
    desc: '修改 Tab 标题、关闭标签页、在新 Tab 中打开详情页'
  };

  readonly detailItems = [1, 2, 3, 4, 5];
  private msg = inject(NzMessageService);
  private tabService = inject(TabService);
  private router = inject(Router);

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
    if (tabArray.length > 1) {
      this.tabService.delTab(tabArray[this.tabService.getCurrentTabIndex()], this.tabService.getCurrentTabIndex());
    } else {
      this.msg.warning('这是最后一个页签，无法关闭');
    }
  }

  openDetailPage(i: number): void {
    this.router.navigate(['default/feat/tabs/example-detail'], { queryParams: { id: i } });
  }

  refresh(): void {
    this.tabService.refresh();
  }
}
