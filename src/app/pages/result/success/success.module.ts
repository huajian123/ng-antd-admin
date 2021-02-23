import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessRoutingModule } from './success-routing.module';
import { SuccessComponent } from './success.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [SuccessComponent],
  imports: [
    CommonModule,
    SharedModule,
    SuccessRoutingModule
  ]
})
export class SuccessModule { }
