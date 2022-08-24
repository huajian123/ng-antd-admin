import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { FullScreenRoutingModule } from './full-screen-routing.module';
import { FullScreenComponent } from './full-screen.component';

@NgModule({
  declarations: [FullScreenComponent],
  imports: [SharedModule, FullScreenRoutingModule]
})
export class FullScreenModule {}
