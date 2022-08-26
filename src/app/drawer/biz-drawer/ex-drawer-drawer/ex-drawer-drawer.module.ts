import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { ExDrawerDrawerComponent } from './ex-drawer-drawer.component';

@NgModule({
  declarations: [ExDrawerDrawerComponent],
  imports: [SharedModule]
})
export class ExDrawerDrawerModule {}
