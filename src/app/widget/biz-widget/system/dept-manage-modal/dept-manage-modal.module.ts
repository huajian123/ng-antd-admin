import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { DeptManageModalComponent } from './dept-manage-modal.component';

@NgModule({
    imports: [SharedModule, DeptManageModalComponent]
})
export class DeptManageModalModule {}
