import {NgModule} from '@angular/core';

import {IconsRoutingModule} from './icons-routing.module';
import {IconsComponent} from './icons.component';
import {SharedModule} from "@shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {IconSelModule} from "@shared/biz-components/icon-sel/icon-sel.module";


@NgModule({
  declarations: [
    IconsComponent
  ],
  imports: [
    IconSelModule,
    SharedModule,
    IconsRoutingModule,
    MatIconModule
  ]
})
export class IconsModule {
}
