import {NgModule} from '@angular/core';

import {AdvancedRoutingModule} from './advanced-routing.module';
import {AdvancedComponent} from './advanced.component';

import {SharedModule} from '@shared/shared.module';
import { WarehouseManageFormComponent } from './warehouse-manage-form/warehouse-manage-form.component';
import { TaskManageFormComponent } from './task-manage-form/task-manage-form.component';
import { UserMemberManageComponent } from './user-member-manage/user-member-manage.component';


@NgModule({
  declarations: [AdvancedComponent, WarehouseManageFormComponent, TaskManageFormComponent, UserMemberManageComponent],
  imports: [
    SharedModule,
    AdvancedRoutingModule
  ]
})
export class AdvancedModule {
}
