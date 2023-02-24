import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { ExDrawerRoutingModule } from './ex-drawer-routing.module';
import { ExDrawerComponent } from './ex-drawer.component';

@NgModule({
  imports: [SharedModule, ExDrawerRoutingModule, ExDrawerComponent]
})
export class ExDrawerModule {}
