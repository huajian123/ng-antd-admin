import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { AdvancedRoutingModule } from './advanced-routing.module';
import { AdvancedComponent } from './advanced.component';
import { TaskManageFormComponent } from './task-manage-form/task-manage-form.component';
import { UserMemberManageComponent } from './user-member-manage/user-member-manage.component';
import { WarehouseManageFormComponent } from './warehouse-manage-form/warehouse-manage-form.component';

@NgModule({
    imports: [SharedModule, AdvancedRoutingModule, AdvancedComponent, WarehouseManageFormComponent, TaskManageFormComponent, UserMemberManageComponent]
})
export class AdvancedModule {}
