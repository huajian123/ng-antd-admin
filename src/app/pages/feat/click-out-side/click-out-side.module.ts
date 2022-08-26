import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { ClickOutSideRoutingModule } from './click-out-side-routing.module';
import { ClickOutSideComponent } from './click-out-side.component';

@NgModule({
  declarations: [ClickOutSideComponent],
  imports: [SharedModule, ClickOutSideRoutingModule]
})
export class ClickOutSideModule {}
