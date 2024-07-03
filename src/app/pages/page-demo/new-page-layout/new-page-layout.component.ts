import { Component } from '@angular/core';

import { UserMemberManageComponent } from '@app/pages/page-demo/form/advanced/user-member-manage/user-member-manage.component';
import { TaskListPanelComponent } from '@app/pages/page-demo/task/task-list-panel/task-list-panel.component';
import { TaskSearchInfoComponent } from '@app/pages/page-demo/task/task-search-info/task-search-info.component';
import { NzBreadCrumbComponent, NzBreadCrumbItemComponent } from 'ng-zorro-antd/breadcrumb';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-new-page-layout',
  standalone: true,
  imports: [
    NzColDirective,
    NzRowDirective,
    TaskListPanelComponent,
    TaskSearchInfoComponent,
    NzBreadCrumbComponent,
    NzBreadCrumbItemComponent,
    NzIconDirective,
    NzCardComponent,
    UserMemberManageComponent,
    NzButtonComponent,
    NzInputGroupComponent,
    NzInputDirective
  ],
  templateUrl: './new-page-layout.component.html'
})
export class NewPageLayoutComponent {}
