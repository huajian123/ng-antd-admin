import { NgModule } from '@angular/core';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';
import {SharedModule} from "@shared/shared.module";
import { DetailComponent } from './detail/detail.component';


@NgModule({
  declarations: [
    TabsComponent,
    DetailComponent
  ],
  imports: [
    SharedModule,
    TabsRoutingModule
  ]
})
export class TabsModule { }
