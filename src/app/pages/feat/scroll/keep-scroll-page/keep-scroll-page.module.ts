import {NgModule} from '@angular/core';

import {KeepScrollPageRoutingModule} from './keep-scroll-page-routing.module';
import {KeepScrollPageComponent} from './keep-scroll-page.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    KeepScrollPageComponent
  ],
  imports: [
    SharedModule,
    KeepScrollPageRoutingModule
  ]
})
export class KeepScrollPageModule {
}
