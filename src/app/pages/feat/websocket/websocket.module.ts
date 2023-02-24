import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { WebsocketRoutingModule } from './websocket-routing.module';
import { WebsocketComponent } from './websocket.component';

@NgModule({
    imports: [SharedModule, WebsocketRoutingModule, WebsocketComponent]
})
export class WebsocketModule {}
