import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FlowChatComponent} from "@app/pages/flow/flow-chat/flow-chat.component";

const routes: Routes = [
  {path: '', component: FlowChatComponent, data: {title: '流程图', key: 'flow-chat'}}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowChatRoutingModule { }
