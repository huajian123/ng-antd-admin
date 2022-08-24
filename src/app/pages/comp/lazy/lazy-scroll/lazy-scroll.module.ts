import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { LazyScrollRoutingModule } from './lazy-scroll-routing.module';
import { LazyScrollComponent } from './lazy-scroll.component';

@NgModule({
  declarations: [LazyScrollComponent],
  imports: [SharedModule, LazyScrollRoutingModule]
})
export class LazyScrollModule {}
