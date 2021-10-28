import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DeptManageRoutingModule} from './dept-manage-routing.module';
import {DeptManageComponent} from './dept-manage.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [DeptManageComponent],
  imports: [
    CommonModule,
    SharedModule,
    DeptManageRoutingModule
  ]
})
export class DeptManageModule {
}
