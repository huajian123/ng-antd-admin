import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { Menu2RoutingModule } from './menu2-routing.module';
import { Menu2Component } from './menu2.component';

@NgModule({
  declarations: [Menu2Component],
  imports: [SharedModule, Menu2RoutingModule]
})
export class Menu2Module {}
