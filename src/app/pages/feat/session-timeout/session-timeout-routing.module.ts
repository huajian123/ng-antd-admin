import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SessionTimeoutComponent } from '@app/pages/feat/session-timeout/session-timeout.component';

const routes: Routes = [{ path: '', component: SessionTimeoutComponent, data: { title: '登录过期', key: 'session-timeout' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionTimeoutRoutingModule {}
