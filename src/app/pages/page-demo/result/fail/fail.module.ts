import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { FailRoutingModule } from './fail-routing.module';
import { FailComponent } from './fail.component';

@NgModule({
  declarations: [FailComponent],
  imports: [CommonModule, SharedModule, FailRoutingModule]
})
export class FailModule {}
