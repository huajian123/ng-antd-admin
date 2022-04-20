import { NgModule } from '@angular/core';

import { ContextMenuRoutingModule } from './context-menu-routing.module';
import { ContextMenuComponent } from './context-menu.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    ContextMenuComponent
  ],
  imports: [
    SharedModule,
    ContextMenuRoutingModule
  ]
})
export class ContextMenuModule { }
