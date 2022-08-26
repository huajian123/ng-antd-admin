import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';

import { FlowChatRoutingModule } from './flow-chat-routing.module';
import { FlowChatComponent } from './flow-chat.component';

@NgModule({
  declarations: [FlowChatComponent],
  imports: [SharedModule, FlowChatRoutingModule]
})
export class FlowChatModule {}
