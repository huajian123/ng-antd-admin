import { NgModule } from '@angular/core';

import { IconSelModule } from '@shared/biz-components/icon-sel/icon-sel.module';
import { SharedModule } from '@shared/shared.module';

import { MenuModalComponent } from './menu-modal.component';

@NgModule({
    imports: [IconSelModule, SharedModule, MenuModalComponent]
})
export class MenuModalModule {}
