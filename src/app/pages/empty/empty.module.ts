import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EmptyRoutingModule } from './empty-routing.module';
import { EmptyComponent } from './empty.component';

@NgModule({
  declarations: [EmptyComponent],
  imports: [CommonModule, EmptyRoutingModule]
})
export class EmptyModule {}
