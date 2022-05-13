import {NgModule} from '@angular/core';

import {SessionTimeoutRoutingModule} from './session-timeout-routing.module';
import {SessionTimeoutComponent} from './session-timeout.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    SessionTimeoutComponent
  ],
  imports: [
    SharedModule,
    SessionTimeoutRoutingModule
  ]
})
export class SessionTimeoutModule {
}
