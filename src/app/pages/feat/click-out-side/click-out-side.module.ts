import {NgModule} from '@angular/core';

import {ClickOutSideRoutingModule} from './click-out-side-routing.module';
import {ClickOutSideComponent} from './click-out-side.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    ClickOutSideComponent
  ],
  imports: [
    SharedModule,
    ClickOutSideRoutingModule
  ]
})
export class ClickOutSideModule {
}
