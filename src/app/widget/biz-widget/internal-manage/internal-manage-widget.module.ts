import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleManageModalComponent} from './role-manage/role-manage-modal.component';
import {SharedModule} from '../../../shared/shared.module';
import {DeptManageComponent} from './dept-manage/dept-manage.component';
import {UserManageModalComponent} from './user-manage/user-manage-modal.component';
import {ResetPasswordModalComponent} from './user-manage/reset-password-modal/reset-password-modal.component';

const MODULES = [
  RoleManageModalComponent,
  DeptManageComponent,
  UserManageModalComponent,
  ResetPasswordModalComponent
];

@NgModule({
  declarations: [...MODULES],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ...MODULES
  ]
})
export class InternalManageWidgetModule {
}
