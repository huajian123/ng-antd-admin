import {NgModule} from '@angular/core';

import {SetupRoutingModule} from './setup-routing.module';
import {SetupComponent} from './setup.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    SetupComponent
  ],
  imports: [
    SharedModule,
    SetupRoutingModule
  ]
})
export class SetupModule {
}
