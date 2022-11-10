import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { DemoRoutingModule } from './demo-routing.module';
import { DemoComponent } from './demo.component';
import {WebserviceService} from 'src/app/core/services/common/webservice.service';


@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    SharedModule,
    DemoRoutingModule
  ],
  providers: [WebserviceService]
})
export class DemoModule { }
