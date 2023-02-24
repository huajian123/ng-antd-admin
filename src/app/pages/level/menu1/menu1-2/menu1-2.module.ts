import { NgModule } from '@angular/core';

import { Menu12Component } from '@app/pages/level/menu1/menu1-2/menu1-2.component';
import { SharedModule } from '@shared/shared.module';

import { Menu12RoutingModule } from './menu1-2-routing.module';

@NgModule({
    imports: [SharedModule, Menu12RoutingModule, Menu12Component]
})
export class Menu12Module {}
