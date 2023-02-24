import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { Menu2RoutingModule } from './menu2-routing.module';
import { Menu2Component } from './menu2.component';

@NgModule({
    imports: [SharedModule, Menu2RoutingModule, Menu2Component]
})
export class Menu2Module {}
