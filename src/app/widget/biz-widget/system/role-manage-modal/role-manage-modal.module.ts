import {NgModule} from '@angular/core';
import {RoleManageModalComponent} from './role-manage-modal.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    RoleManageModalComponent
  ],
  imports: [
    SharedModule
  ]
})
export class RoleManageModalModule {
}
