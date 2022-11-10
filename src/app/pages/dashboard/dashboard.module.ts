import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { WebserviceService } from 'src/app/core/services/common/webservice.service';


@NgModule({
  declarations: [],
  imports: [DashboardRoutingModule],
  providers: [WebserviceService]
})
export class DashboardModule {}
