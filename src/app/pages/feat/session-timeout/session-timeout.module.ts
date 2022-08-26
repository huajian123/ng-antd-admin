import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { SessionTimeoutRoutingModule } from './session-timeout-routing.module';
import { SessionTimeoutComponent } from './session-timeout.component';

@NgModule({
  declarations: [SessionTimeoutComponent],
  imports: [SharedModule, SessionTimeoutRoutingModule]
})
export class SessionTimeoutModule {}
