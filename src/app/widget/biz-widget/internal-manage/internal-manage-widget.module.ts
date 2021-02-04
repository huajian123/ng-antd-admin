import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleManageModalComponent} from './role-manage/role-manage-modal.component';
import {SharedModule} from '../../../share/shared.module';
import { DeptManageComponent } from './dept-manage/dept-manage.component';


@NgModule({
  declarations: [RoleManageModalComponent, DeptManageComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RoleManageModalComponent
  ]
})
export class InternalManageWidgetModule {
}
