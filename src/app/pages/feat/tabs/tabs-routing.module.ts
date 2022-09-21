import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailComponent } from '@app/pages/feat/tabs/detail/detail.component';
import { TabsComponent } from '@app/pages/feat/tabs/tabs.component';
import { ActionCode } from '@config/actionCode';

const routes: Routes = [
  { path: '', component: TabsComponent, data: { title: 'Tác vụ tab', key: 'tabs' } },
  { path: 'example-detail', component: DetailComponent, data: { newTab: 'true', authCode: ActionCode.TabsDetail, title: 'Chi tiết demo', key: 'example-detail' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {}
