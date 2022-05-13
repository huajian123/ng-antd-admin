import {NgModule} from '@angular/core';

import {WebsocketRoutingModule} from './websocket-routing.module';
import {WebsocketComponent} from './websocket.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    WebsocketComponent
  ],
  imports: [
    SharedModule,
    WebsocketRoutingModule
  ]
})
export class WebsocketModule {
}
