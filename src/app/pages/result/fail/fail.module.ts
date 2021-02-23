import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FailRoutingModule } from './fail-routing.module';
import { FailComponent } from './fail.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [FailComponent],
  imports: [
    CommonModule,
    SharedModule,
    FailRoutingModule
  ]
})
export class FailModule { }
