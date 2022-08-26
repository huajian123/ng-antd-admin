import { NgModule } from '@angular/core';

import { ExDrawerDrawerModule } from '@app/drawer/biz-drawer/ex-drawer-drawer/ex-drawer-drawer.module';
import { SharedModule } from '@shared/shared.module';

import { ExDrawerRoutingModule } from './ex-drawer-routing.module';
import { ExDrawerComponent } from './ex-drawer.component';

@NgModule({
  declarations: [ExDrawerComponent],
  imports: [SharedModule, ExDrawerDrawerModule, ExDrawerRoutingModule]
})
export class ExDrawerModule {}
