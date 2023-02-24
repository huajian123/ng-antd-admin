import { NgModule } from '@angular/core';

import { Menu112Component } from '@app/pages/level/menu1/menu1-1/menu1-1-2/menu112.component';
import { SharedModule } from '@shared/shared.module';

import { Menu112RoutingModule } from './menu1-1-2-routing.module';

@NgModule({
    imports: [SharedModule, Menu112RoutingModule, Menu112Component]
})
export class Menu112Module {}
