import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FlowChatComponent } from './flow-chat.component';

const routes: Routes = [{ path: '', component: FlowChatComponent, data: { title: 'sơ đồ', key: 'flow-chat' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowChatRoutingModule {}
