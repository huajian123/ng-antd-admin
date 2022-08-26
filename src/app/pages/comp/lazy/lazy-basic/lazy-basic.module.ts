import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { LazyBasicRoutingModule } from './lazy-basic-routing.module';
import { LazyBasicComponent } from './lazy-basic.component';

@NgModule({
  declarations: [LazyBasicComponent],
  imports: [SharedModule, LazyBasicRoutingModule]
})
export class LazyBasicModule {}
