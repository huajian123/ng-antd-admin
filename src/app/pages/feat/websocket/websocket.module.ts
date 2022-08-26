import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { WebsocketRoutingModule } from './websocket-routing.module';
import { WebsocketComponent } from './websocket.component';

@NgModule({
  declarations: [WebsocketComponent],
  imports: [SharedModule, WebsocketRoutingModule]
})
export class WebsocketModule {}
