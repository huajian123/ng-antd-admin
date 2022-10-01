import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClickOutSideComponent } from '@app/pages/feat/click-out-side/click-out-side.component';

const routes: Routes = [{ path: '', component: ClickOutSideComponent, data: { title: 'clickOutSide', key: 'click-out-side' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClickOutSideRoutingModule {}
