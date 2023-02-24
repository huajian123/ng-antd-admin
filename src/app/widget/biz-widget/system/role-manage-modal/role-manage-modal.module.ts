import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { RoleManageModalComponent } from './role-manage-modal.component';

@NgModule({
    imports: [SharedModule, RoleManageModalComponent]
})
export class RoleManageModalModule {}
