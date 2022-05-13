import {NgModule} from '@angular/core';

import {DeptRoutingModule} from './dept-routing.module';
import {DeptComponent} from './dept.component';
import {SharedModule} from "@shared/shared.module";
import {DeptManageModalModule} from "@widget/biz-widget/system/dept-manage-modal/dept-manage-modal.module";


@NgModule({
  declarations: [
    DeptComponent
  ],
  imports: [
    SharedModule,
    DeptManageModalModule,
    DeptRoutingModule
  ]
})
export class DeptModule {
}
