import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { KeepScrollPageRoutingModule } from './keep-scroll-page-routing.module';
import { KeepScrollPageComponent } from './keep-scroll-page.component';

@NgModule({
  declarations: [KeepScrollPageComponent],
  imports: [SharedModule, KeepScrollPageRoutingModule]
})
export class KeepScrollPageModule {}
