import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExModalComponent } from '@app/pages/feat/ex-modal/ex-modal.component';

const routes: Routes = [{ path: '', component: ExModalComponent, data: { title: '拖拽modal', key: 'ex-modal' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExModalRoutingModule {}
