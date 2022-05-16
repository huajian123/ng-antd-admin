import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TabsComponent} from "@app/pages/feat/tabs/tabs.component";
import {DetailComponent} from "@app/pages/feat/tabs/detail/detail.component";
import {ActionCode} from "@config/actionCode";

const routes: Routes = [
  {path: '', component: TabsComponent, data: {title: '标签页操作', key: 'tabs'}},
  {path: 'example-detail', component: DetailComponent, data: {newTab:'true',
      authCode: ActionCode.TabsDetail,
      title: '演示详情', key: 'example-detail'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule {
}
