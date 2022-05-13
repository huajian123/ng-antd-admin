import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WebsocketComponent} from "@app/pages/feat/websocket/websocket.component";

const routes: Routes = [
  {path: '', component: WebsocketComponent, data: {title: 'websocket测试', key: 'websocket'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsocketRoutingModule { }
