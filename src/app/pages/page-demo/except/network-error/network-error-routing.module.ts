import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NetworkErrorComponent } from '@app/pages/page-demo/except/network-error/network-error.component';

const routes: Routes = [{ path: '', component: NetworkErrorComponent, data: { title: 'Lỗi mạng', key: 'network-error' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetworkErrorRoutingModule {}
