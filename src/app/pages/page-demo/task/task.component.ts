import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TaskListPanelComponent } from '@app/pages/page-demo/task/task-list-panel/task-list-panel.component';
import { TaskSearchInfoComponent } from '@app/pages/page-demo/task/task-search-info/task-search-info.component';
import { PageHeaderComponent, PageHeaderType } from '@shared/components/page-header/page-header.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [PageHeaderComponent, NzGridModule, TaskSearchInfoComponent, NzCardModule, TaskListPanelComponent],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskComponent {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '任务',
    breadcrumb: ['首页', '页面', '任务']
  };
}
