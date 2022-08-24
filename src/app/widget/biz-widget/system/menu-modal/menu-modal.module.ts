import { NgModule } from '@angular/core';

import { IconSelModule } from '@shared/biz-components/icon-sel/icon-sel.module';
import { SharedModule } from '@shared/shared.module';

import { MenuModalComponent } from './menu-modal.component';

@NgModule({
  declarations: [MenuModalComponent],
  imports: [IconSelModule, SharedModule]
})
export class MenuModalModule {}
