import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RippleComponent } from '@app/pages/feat/ripple/ripple.component';

const routes: Routes = [{ path: '', component: RippleComponent, data: { title: '水波纹', key: 'ripple' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RippleRoutingModule {}
