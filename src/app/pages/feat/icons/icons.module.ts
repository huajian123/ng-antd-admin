import {NgModule} from '@angular/core';

import {IconsRoutingModule} from './icons-routing.module';
import {IconsComponent} from './icons.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    IconsComponent
  ],
  imports: [
    SharedModule,
    IconsRoutingModule
  ]
})
export class IconsModule {
}
