import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserManageRoutingModule} from './user-manage-routing.module';
import {UserManageComponent} from './user-manage.component';
import {SharedModule} from '../../../share/shared.module';
import {NzNoAnimationModule} from 'ng-zorro-antd/core/no-animation';

@NgModule({
  declarations: [UserManageComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserManageRoutingModule,
    NzNoAnimationModule
  ]
})

export class UserManageModule {
}
