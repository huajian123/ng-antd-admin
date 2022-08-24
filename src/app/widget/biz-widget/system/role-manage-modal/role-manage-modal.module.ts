import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { RoleManageModalComponent } from './role-manage-modal.component';

@NgModule({
  declarations: [RoleManageModalComponent],
  imports: [SharedModule]
})
export class RoleManageModalModule {}
