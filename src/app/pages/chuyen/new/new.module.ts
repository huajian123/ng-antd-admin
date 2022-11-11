import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { DeptManageModalModule } from '@app/widget/biz-widget/system/dept-manage-modal/dept-manage-modal.module';
import { NewComponent } from './new.component';
import { SubwindowxeModule } from '@app/widget/modal/subwindowxe/subwindowxe.module';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';


@NgModule({
  declarations: [
    NewComponent
  ],
  imports: [
    NewRoutingModule,
    SharedModule,
    SubwindowxeModule,
    NzHighlightModule
  ]
})
export class NewModule { }
