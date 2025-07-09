import { Component } from '@angular/core';

import { UserMemberManageComponent } from '@app/pages/page-demo/form/advanced/user-member-manage/user-member-manage.component';

import { NzBreadCrumbComponent, NzBreadCrumbItemComponent } from 'ng-zorro-antd/breadcrumb';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzCardComponent } from 'ng-zorro-antd/card';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-new-page-layout',
  imports: [NzBreadCrumbComponent, NzBreadCrumbItemComponent, NzIconDirective, NzCardComponent, UserMemberManageComponent, NzButtonComponent, NzInputGroupComponent, NzInputDirective],
  templateUrl: './new-page-layout.component.html'
})
export class NewPageLayoutComponent {}
