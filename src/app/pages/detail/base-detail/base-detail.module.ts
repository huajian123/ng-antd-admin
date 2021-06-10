import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseDetailRoutingModule } from './base-detail-routing.module';
import { BaseDetailComponent } from './base-detail.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [BaseDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    BaseDetailRoutingModule
  ]
})
export class BaseDetailModule { }
