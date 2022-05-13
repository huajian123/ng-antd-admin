import { NgModule } from '@angular/core';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import {SharedModule} from "@shared/shared.module";
import {MenuModalModule} from "@widget/biz-widget/system/menu-modal/menu-modal.module";


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    SharedModule,
    MenuModalModule,
    MenuRoutingModule
  ]
})
export class MenuModule { }
