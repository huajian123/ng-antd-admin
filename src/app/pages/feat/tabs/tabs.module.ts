import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabsRoutingModule } from './tabs-routing.module';
import { TabsComponent } from './tabs.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    TabsComponent
  ],
  imports: [
    SharedModule,
    TabsRoutingModule
  ]
})
export class TabsModule { }
