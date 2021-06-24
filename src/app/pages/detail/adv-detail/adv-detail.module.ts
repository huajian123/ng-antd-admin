import { NgModule } from '@angular/core';
import { AdvDetailRoutingModule } from './adv-detail-routing.module';
import { AdvDetailComponent } from './adv-detail.component';
import {SharedModule} from '../../../share/shared.module';


@NgModule({
  declarations: [AdvDetailComponent],
  imports: [
    SharedModule,
    AdvDetailRoutingModule
  ]
})
export class AdvDetailModule { }
