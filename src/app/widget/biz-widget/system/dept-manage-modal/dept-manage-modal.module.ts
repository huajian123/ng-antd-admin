import { NgModule } from '@angular/core';
import { DeptManageModalComponent } from './dept-manage-modal.component';
import {SharedModule} from "@shared/shared.module";



@NgModule({
  declarations: [
    DeptManageModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class DeptManageModalModule { }
