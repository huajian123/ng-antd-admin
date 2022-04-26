import {NgModule} from '@angular/core';

import {FlowChatRoutingModule} from './flow-chat-routing.module';
import {FlowChatComponent} from './flow-chat.component';
import {SharedModule} from "@shared/shared.module";


@NgModule({
  declarations: [
    FlowChatComponent
  ],
  imports: [
    SharedModule,
    FlowChatRoutingModule
  ]
})
export class FlowChatModule {
}
