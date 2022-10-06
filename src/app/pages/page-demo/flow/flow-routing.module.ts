import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'flow-chat', pathMatch: 'full' },
  { path: 'flow-chat', loadChildren: () => import('./flow-chat/flow-chat.module').then(m => m.FlowChatModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowRoutingModule {}
