import {NgModule} from '@angular/core';

import {IconsRoutingModule} from './icons-routing.module';
import {IconsComponent} from './icons.component';
import {SharedModule} from "@shared/shared.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    IconsComponent
  ],
    imports: [
        SharedModule,
        IconsRoutingModule,
        MatIconModule
    ]
})
export class IconsModule {
}
