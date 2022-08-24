import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlankRoutingModule } from './blank-routing.module';
import { BlankComponent } from './blank.component';

@NgModule({
  declarations: [BlankComponent],
  imports: [CommonModule, BlankRoutingModule]
})
export class BlankModule {}
