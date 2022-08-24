import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { DeptManageModalModule } from '@widget/biz-widget/system/dept-manage-modal/dept-manage-modal.module';

import { DeptRoutingModule } from './dept-routing.module';
import { DeptComponent } from './dept.component';

@NgModule({
  declarations: [DeptComponent],
  imports: [SharedModule, DeptManageModalModule, DeptRoutingModule]
})
export class DeptModule {}
