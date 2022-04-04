import { NgModule } from '@angular/core';
import { Menu112RoutingModule } from './menu1-1-2-routing.module';
import {Menu112Component} from "@app/pages/level/menu1/menu1-1/menu1-1-2/menu112.component";
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [Menu112Component],
  imports: [
    SharedModule,
    Menu112RoutingModule
  ]
})
export class Menu112Module { }
