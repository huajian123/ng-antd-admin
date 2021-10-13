import { NgModule } from '@angular/core';
import { BaseDetailRoutingModule } from './base-detail-routing.module';
import { BaseDetailComponent } from './base-detail.component';
import {SharedModule} from '../../../shared/shared.module';


@NgModule({
  declarations: [BaseDetailComponent],
  imports: [
    SharedModule,
    BaseDetailRoutingModule
  ]
})
export class BaseDetailModule { }
