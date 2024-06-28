import { Component } from '@angular/core';

import { TaskSearchFiltersComponent } from '@app/pages/page-demo/task/task-search-info/task-search-filters/task-search-filters.component';
import { UserInfoComponent } from '@app/pages/page-demo/task/task-search-info/user-info/user-info.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-task-search-info',
  standalone: true,
  imports: [UserInfoComponent, TaskSearchFiltersComponent, NzDividerModule, NzCardModule],
  templateUrl: './task-search-info.component.html',
  styleUrls: ['./task-search-info.component.less']
})
export class TaskSearchInfoComponent {}
