import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'flow-chat', loadChildren: () => import('./flow-chat/flow-chat.module').then(m => m.FlowChatModule)},
  {path: '', redirectTo: 'flow-chat', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowRoutingModule { }
