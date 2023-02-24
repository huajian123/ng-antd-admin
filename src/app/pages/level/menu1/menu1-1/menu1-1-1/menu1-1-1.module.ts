import { NgModule } from '@angular/core';

import { Menu111Component } from '@app/pages/level/menu1/menu1-1/menu1-1-1/menu111.component';
import { SharedModule } from '@shared/shared.module';

import { Menu111RoutingModule } from './menu1-1-1-routing.module';

@NgModule({
    imports: [SharedModule, Menu111RoutingModule, Menu111Component]
})
export class Menu111Module {}
